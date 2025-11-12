      // Ativar links da navbar ao rolar
      document.addEventListener("DOMContentLoaded", function () {
        const navLinks = document.querySelectorAll(".nav-link");

        function activateLink() {
          const fromTop = window.scrollY + 100;

          navLinks.forEach((link) => {
            const section = document.querySelector(link.hash);

            if (
              section.offsetTop <= fromTop &&
              section.offsetTop + section.offsetHeight > fromTop
            ) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }

        window.addEventListener("scroll", activateLink);
      });
