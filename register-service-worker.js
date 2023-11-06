if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}
if ("serviceWorker" in navigator && "PushManager" in window) {
  navigator.serviceWorker.ready.then(function (registration) {
    // Check if the app isn't already installed
    if (!registration.active && !registration.waiting) {
      registration.pushManager.getSubscription().then(function (subscription) {
        if (!subscription) {
          // Show the install prompt
          // (You may want to do this in response to a user action, like clicking a button)
          // You can use the "beforeinstallprompt" event for better control
          // See: https://developers.google.com/web/fundamentals/app-install-banners/
          window.addEventListener("beforeinstallprompt", function (event) {
            event.preventDefault();
            const installButton = document.querySelector("#install-button");
            installButton.addEventListener("click", function () {
              event.prompt();
              event.userChoice.then(function (choiceResult) {
                if (choiceResult.outcome === "accepted") {
                  console.log("User accepted the install prompt");
                } else {
                  console.log("User dismissed the install prompt");
                }
              });
            });
            installButton.style.display = "block";
          });
        }
      });
    }
  });
}
