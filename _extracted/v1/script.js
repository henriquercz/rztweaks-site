(() => {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DISCORD = "https://discord.gg/ugcU6gtnnj";

  /* Mobile menu */
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.getElementById("mobileMenu");
  if (menuToggle && mobileMenu) {
    const closeMenu = () => {
      mobileMenu.hidden = true;
      menuToggle.setAttribute("aria-expanded", "false");
    };
    menuToggle.addEventListener("click", () => {
      const open = mobileMenu.hidden;
      mobileMenu.hidden = !open;
      menuToggle.setAttribute("aria-expanded", String(open));
    });
    mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !mobileMenu.hidden) {
        closeMenu();
        menuToggle.focus();
      }
    });
    document.addEventListener("click", (e) => {
      if (!mobileMenu.hidden && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) closeMenu();
    });
    window.matchMedia("(min-width: 901px)").addEventListener("change", (e) => {
      if (e.matches) closeMenu();
    });
  }

  /* Stagger delays for groups */
  [".proof-stat", ".proof-quote", ".service", ".how-step", ".footer-tile"].forEach((sel) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.style.setProperty("--delay", `${Math.min(i * 70, 280)}ms`);
    });
  });

  /* Reveal on scroll */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            reveal.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach((el) => reveal.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* Drag-to-scroll rows */
  function enableDrag(el, onScroll) {
    let down = false;
    let moved = false;
    let startX = 0;
    let startLeft = 0;
    el.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true;
      moved = false;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
    });
    el.addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = startLeft - dx;
      if (moved) e.preventDefault();
    });
    const end = (e) => {
      if (!down) return;
      down = false;
      try { el.releasePointerCapture(e.pointerId); } catch (_) {}
    };
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);
    el.addEventListener("click", (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    }, true);
    if (onScroll) el.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Hero strip: duplicate once for a seamless loop, then advance it slowly */
  const heroStrip = document.getElementById("heroStrip");
  const stripToggle = document.getElementById("stripToggle");
  if (heroStrip) {
    enableDrag(heroStrip);
    const originals = Array.from(heroStrip.children);
    originals.forEach((el) => {
      const clone = el.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.tabIndex = -1;
      heroStrip.appendChild(clone);
    });
    const seam = () => {
      const first = heroStrip.children[0];
      const clone = heroStrip.children[originals.length];
      return clone ? clone.offsetLeft - first.offsetLeft : 0;
    };

    let playing = !reduced;
    let hover = false;
    let touching = false;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min(now - last, 64);
      last = now;
      if (playing && !hover && !touching) {
        heroStrip.scrollLeft += (0.35 * dt) / 16.67;
        const edge = seam();
        if (edge > 0 && heroStrip.scrollLeft >= edge) heroStrip.scrollLeft -= edge;
      }
      requestAnimationFrame(tick);
    };

    if (!reduced && stripToggle) {
      stripToggle.hidden = false;
      stripToggle.addEventListener("click", () => {
        playing = !playing;
        stripToggle.textContent = playing ? "Pausar" : "Retomar";
        stripToggle.setAttribute("aria-pressed", String(!playing));
      });
      heroStrip.addEventListener("pointerenter", () => { hover = true; });
      heroStrip.addEventListener("pointerleave", () => { hover = false; });
      heroStrip.addEventListener("pointerdown", () => { touching = true; });
      heroStrip.addEventListener("pointerup", () => { touching = false; });
      heroStrip.addEventListener("pointercancel", () => { touching = false; });
      heroStrip.addEventListener("focusin", () => { hover = true; });
      heroStrip.addEventListener("focusout", () => { hover = false; });
      requestAnimationFrame(tick);
    }

    if (!reduced) {
      let ticking = false;
      const shift = () => {
        const y = window.scrollY;
        heroStrip.style.setProperty("--strip-shift", `${Math.min(y * 0.05, 16)}px`);
        ticking = false;
      };
      window.addEventListener("scroll", () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(shift);
        }
      }, { passive: true });
    }
  }

  /* Proof wall expand */
  const proofWall = document.getElementById("proofWall");
  const moreProof = document.getElementById("moreProof");
  const proofItems = proofWall ? Array.from(proofWall.querySelectorAll("[data-proof]")) : [];
  if (proofWall && moreProof) {
    let expanded = false;
    moreProof.addEventListener("click", () => {
      expanded = !expanded;
      proofItems.forEach((item, i) => {
        if (i >= 12) item.hidden = !expanded;
      });
      moreProof.textContent = expanded ? "Mostrar menos" : "Ver todos os 25 prints";
      moreProof.setAttribute("aria-expanded", String(expanded));
      if (!expanded) {
        document.getElementById("resultados").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      }
    });
  }

  /* Lightbox */
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");
  let currentProof = 0;

  function showProof(index) {
    if (!proofItems.length) return;
    currentProof = (index + proofItems.length) % proofItems.length;
    const item = proofItems[currentProof];
    const img = item.querySelector("img");
    lightboxImage.src = img.getAttribute("src");
    lightboxImage.alt = img.getAttribute("alt") || "";
    lightboxCaption.textContent = item.dataset.caption || "Print de feedback";
  }

  function openProof(index) {
    if (!lightbox || !lightboxImage) return;
    showProof(index);
    lightbox.showModal();
    document.body.classList.add("lightbox-open");
  }

  document.querySelectorAll("[data-proof]").forEach((btn) => {
    btn.addEventListener("click", () => openProof(Number(btn.dataset.proof)));
  });
  if (lightbox) {
    lightboxClose.addEventListener("click", () => lightbox.close());
    lightboxPrev.addEventListener("click", () => showProof(currentProof - 1));
    lightboxNext.addEventListener("click", () => showProof(currentProof + 1));
    lightbox.addEventListener("close", () => document.body.classList.remove("lightbox-open"));
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) lightbox.close();
    });
    lightbox.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); showProof(currentProof - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); showProof(currentProof + 1); }
    });
  }

  /* Count-up stats */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && !reduced && "IntersectionObserver" in window) {
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = Number(el.dataset.count);
          const start = performance.now();
          const duration = 900;
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = String(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          el.textContent = "0";
          requestAnimationFrame(tick);
          countObserver.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => countObserver.observe(el));
  }

  /* Order builder */
  const SERVICES = {
    fps: { name: "FPS & input lag", price: 37.5 },
    limpeza: { name: "Limpeza do Windows", price: 10 },
    internet: { name: "Otimização de internet", price: 7 },
    formatacao: { name: "Formatação", price: 7 },
    bios: { name: "Ajuste de BIOS", price: 45 },
    completo: { name: "Pacote completo", price: 50 }
  };
  const INCLUDED = ["fps", "limpeza", "internet", "formatacao"];
  const selected = new Set();
  const addButtons = Array.from(document.querySelectorAll("[data-add]"));
  const serviceRows = Array.from(document.querySelectorAll(".service"));
  const orderBar = document.getElementById("orderBar");
  const orderCount = document.getElementById("orderCount");
  const orderTotal = document.getElementById("orderTotal");
  const orderClear = document.getElementById("orderClear");
  const copyOrder = document.getElementById("copyOrder");
  const orderFallback = document.getElementById("orderFallback");
  const orderText = document.getElementById("orderText");
  const orderFallbackClose = document.getElementById("orderFallbackClose");
  const brl = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  function buildOrderText() {
    const lines = Array.from(selected).map((id) => `- ${SERVICES[id].name}: ${brl(SERVICES[id].price)}`);
    const total = Array.from(selected).reduce((sum, id) => sum + SERVICES[id].price, 0);
    return `Olá! Quero otimizar meu PC com a RZ Tweaks.\nServiços:\n${lines.join("\n")}\nTotal: ${brl(total)}\n\nPode me orientar?`;
  }

  function updateOrder() {
    const hasPackage = selected.has("completo");
    addButtons.forEach((btn) => {
      const id = btn.dataset.add;
      const included = hasPackage && INCLUDED.includes(id);
      if (included) {
        btn.disabled = true;
        btn.setAttribute("aria-pressed", "false");
        btn.textContent = "Incluído no pacote";
      } else {
        btn.disabled = false;
        const on = selected.has(id);
        btn.setAttribute("aria-pressed", String(on));
        btn.textContent = id === "completo"
          ? (on ? "Adicionado ao pedido" : "Adicionar ao pedido")
          : (on ? "Adicionado" : "Adicionar");
      }
    });
    serviceRows.forEach((row) => row.classList.toggle("is-selected", selected.has(row.dataset.service)));

    const count = selected.size;
    const total = Array.from(selected).reduce((sum, id) => sum + SERVICES[id].price, 0);
    orderCount.textContent = count === 1 ? "1 serviço" : `${count} serviços`;
    orderTotal.textContent = brl(total);
    const show = count > 0;
    orderBar.hidden = !show;
    document.body.classList.toggle("has-order", show);
  }

  addButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.disabled) return;
      const id = btn.dataset.add;
      if (selected.has(id)) {
        selected.delete(id);
      } else {
        selected.add(id);
        if (id === "completo") INCLUDED.forEach((service) => selected.delete(service));
      }
      updateOrder();
    });
  });

  if (orderClear) {
    orderClear.addEventListener("click", () => {
      selected.clear();
      updateOrder();
    });
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (_) {}
      ta.remove();
      return ok;
    }
  }

  if (copyOrder) {
    copyOrder.addEventListener("click", () => {
      if (!selected.size) return;
      const text = buildOrderText();
      copyText(text).then((ok) => {
        if (!ok && orderFallback && orderText) {
          orderText.value = text;
          orderFallback.hidden = false;
          orderText.focus();
          orderText.select();
        } else {
          copyOrder.textContent = "Pedido copiado";
          setTimeout(() => { copyOrder.textContent = "Copiar pedido e abrir Discord"; }, 3200);
        }
      });
    });
  }

  if (orderFallbackClose) {
    orderFallbackClose.addEventListener("click", () => { orderFallback.hidden = true; });
  }
})();
