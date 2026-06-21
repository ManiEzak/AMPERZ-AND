

/* =========================================================================
   CONSOLIDATED AMPERZAND CUSTOM JS
   ========================================================================= */

WebFont.load({ google: { families: ["Inter Tight:regular,500,600", "Manrope:regular,500,600", "DM Sans:regular,500"] } });

/* --- Next block --- */

!function (o, c) { var n = c.documentElement, t = " w-mod-"; n.className += t + "js", ("ontouchstart" in o || o.DocumentTouch && c instanceof DocumentTouch) && (n.className += t + "touch") }(window, document);

/* --- Next block --- */


      var currentSlideIndex = 0;
      var autoplayInterval = null;
      var isAutoplayPaused = false;
      var slideElements = [
        document.getElementById('slide-brd'),
        document.getElementById('slide-srd'),
        document.getElementById('slide-fsd'),
        document.getElementById('slide-plan'),
        document.getElementById('slide-tasks')
      ];

      function selectDocSlide(idx, manualClick) {
        currentSlideIndex = idx;

        // Update active document card styling
        document.querySelectorAll('.dex-doc-card').forEach(function (card, index) {
          card.classList.remove('active');
          if (index === idx) {
            card.classList.add('active');
          }
        });

        // Update slide display
        slideElements.forEach(function (slide, index) {
          if (index === idx) {
            slide.style.display = 'flex';
            setTimeout(function () {
              slide.classList.add('active');
            }, 50);
          } else {
            slide.classList.remove('active');
            slide.style.display = 'none';
          }
        });

        // Update indicator dots
        document.querySelectorAll('.slide-indicator-dot').forEach(function (dot, index) {
          dot.classList.remove('active');
          if (index === idx) {
            dot.classList.add('active');
          }
        });
      }

      function pauseAutoplay() {
        isAutoplayPaused = true;
      }

      function resumeAutoplay() {
        isAutoplayPaused = false;
      }

      function startSlideshowLoop() {
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(function () {
          if (!isAutoplayPaused) {
            var nextIdx = (currentSlideIndex + 1) % 5; // Cycles all 5 slides
            selectDocSlide(nextIdx, false);
          }
        }, 3000);
      }

      function initDexSlides() {
        selectDocSlide(0, false);
        startSlideshowLoop();

        // Programmatically bind hover events to card selectors and the viewer itself
        document.querySelectorAll('.dex-doc-card, .dex-slide-viewer').forEach(function (el) {
          el.addEventListener('mouseenter', function () {
            isAutoplayPaused = true;
          });
          el.addEventListener('mouseleave', function () {
            isAutoplayPaused = false;
          });
        });

        // Let user manual click pause autoplay permanently
        document.querySelectorAll('.dex-doc-card').forEach(function (card) {
          card.addEventListener('click', function () {
            clearInterval(autoplayInterval); // Clear permanently on manual click
          });
        });
        document.querySelectorAll('.slide-indicator-dot').forEach(function (dot) {
          dot.addEventListener('click', function () {
            clearInterval(autoplayInterval);
          });
        });
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDexSlides);
      } else {
        initDexSlides();
      }
    

/* --- Next block --- */


    document.addEventListener("DOMContentLoaded", () => {

      // ── DEX 8-Step Interactive Pipeline Dashboard Widget Controller ─────────
      const stepCards = document.querySelectorAll(".dex-dashboard-widget .step-card");
      const stepPanels = document.querySelectorAll(".dex-dashboard-widget .step-panel");

      let currentStep = 0;
      let currentSubbox = 0;
      let stepAutoplayTimer = null;

      function setStepAndSubbox(stepIndex, subboxIndex) {
        currentStep = stepIndex;
        currentSubbox = subboxIndex;

        // 1. Update active classes on step cards
        stepCards.forEach((card, idx) => {
          if (idx === stepIndex) {
            card.classList.add("active");
          } else {
            card.classList.remove("active");
          }
        });

        // 2. Update active classes on step panels and sub-boxes
        stepPanels.forEach((panel, idx) => {
          if (idx === stepIndex) {
            panel.classList.add("active");

            // Update sub-boxes inside this panel
            const subboxes = panel.querySelectorAll(".sub-box");
            subboxes.forEach((box, sIdx) => {
              if (sIdx === subboxIndex) {
                box.classList.add("active");
              } else {
                box.classList.remove("active");
              }
            });
          } else {
            panel.classList.remove("active");
          }
        });
      }

      function startStepAutoplay() {
        if (stepAutoplayTimer) clearTimeout(stepAutoplayTimer);

        const activePanel = stepPanels[currentStep];
        const subboxesCount = activePanel ? activePanel.querySelectorAll(".sub-box").length : 3;

        // Sub-box transitions every 2 seconds, with a 3-second hold on the last sub-box
        const isLastSubbox = (currentSubbox >= subboxesCount - 1);
        const duration = isLastSubbox ? 3000 : 2000;

        stepAutoplayTimer = setTimeout(() => {
          if (isLastSubbox) {
            currentSubbox = 0;
            currentStep = (currentStep + 1) % stepCards.length;
          } else {
            currentSubbox++;
          }
          setStepAndSubbox(currentStep, currentSubbox);
          startStepAutoplay();
        }, duration);
      }

      // Click handler on step cards: jumps to that step and highlights its 1st subbox
      stepCards.forEach((card, idx) => {
        card.addEventListener("click", () => {
          setStepAndSubbox(idx, 0);
          startStepAutoplay(); // Reset interval timer
        });
      });

      // Click handler on sub-boxes: highlights clicked sub-box and resets timer
      stepPanels.forEach((panel, stepIdx) => {
        const subboxes = panel.querySelectorAll(".sub-box");
        subboxes.forEach((box, subboxIdx) => {
          box.addEventListener("click", () => {
            setStepAndSubbox(stepIdx, subboxIdx);
            startStepAutoplay(); // Reset interval timer
          });
        });
      });

      // Initialize first state for the dashboard widget
      if (stepCards.length > 0) {
        setStepAndSubbox(0, 0);
        startStepAutoplay();
      }
    });

    // ── DeX Platform Auto-Cycling Tabs Controller ──
    document.addEventListener("DOMContentLoaded", () => {
      const tabButtons = document.querySelectorAll(".dex-tab-btn");
      const tabPanels = document.querySelectorAll(".dex-tab-panel");
      let currentTabIdx = 0;
      let tabAutoplayInterval = null;

      function selectTab(idx) {
        currentTabIdx = idx;

        // Update active class on buttons
        tabButtons.forEach((btn, index) => {
          if (index === idx) {
            btn.classList.add("active");
          } else {
            btn.classList.remove("active");
          }
        });

        // Update display of panels
        tabPanels.forEach((panel, index) => {
          if (index === idx) {
            panel.style.display = "flex";
            panel.classList.add("active");
          } else {
            panel.style.display = "none";
            panel.classList.remove("active");
          }
        });
      }

      function startTabAutoplay() {
        stopTabAutoplay();
        tabAutoplayInterval = setInterval(() => {
          currentTabIdx = (currentTabIdx + 1) % tabButtons.length;
          selectTab(currentTabIdx);
        }, 3000);
      }

      function stopTabAutoplay() {
        if (tabAutoplayInterval) {
          clearInterval(tabAutoplayInterval);
        }
      }

      // Add click event to buttons
      tabButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
          selectTab(index);
          // Restart autoplay from this clicked tab
          startTabAutoplay();
        });
      });

      // Pause autoplay on mouse hover over the tabs display card
      const displayCard = document.querySelector(".dex-tab-display-card");
      if (displayCard) {
        displayCard.addEventListener("mouseenter", stopTabAutoplay);
        displayCard.addEventListener("mouseleave", startTabAutoplay);
      }

      // Initialize
      if (tabButtons.length > 0) {
        selectTab(0);
        startTabAutoplay();
      }
    });

  