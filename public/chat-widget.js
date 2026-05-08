(function () {
  if (window.__fluxbotWidgetLoaded) return;
  window.__fluxbotWidgetLoaded = true;

  var currentScript =
    document.currentScript ||
    (function () {
      var scripts = document.getElementsByTagName("script");
      return scripts[scripts.length - 1];
    })();

  if (!currentScript) return;

  var config = {
    token: currentScript.dataset.token || "",
    position: currentScript.dataset.position === "left" ? "left" : "right",
    primaryColor: currentScript.dataset.primaryColor || "#0ea5e9",
    greeting:
      currentScript.dataset.greeting || "Hola, soy tu asistente virtual.",
    endpoint: currentScript.dataset.endpoint || "",
    title: currentScript.dataset.title || "Fluxbot Assistant",
  };

  var side = config.position === "left" ? "left" : "right";

  var style = document.createElement("style");
  style.innerHTML =
    ".fluxbot-widget{position:fixed;bottom:20px;" +
    side +
    ':20px;z-index:99999;font-family:Arial,sans-serif}.fluxbot-toggle{width:56px;height:56px;border-radius:999px;border:0;cursor:pointer;color:#fff;font-size:22px;background:' +
    config.primaryColor +
    ";box-shadow:0 8px 24px rgba(0,0,0,.25)}.fluxbot-panel{display:none;flex-direction:column;width:320px;height:460px;margin-bottom:10px;border-radius:14px;overflow:hidden;background:#0f172a;border:1px solid rgba(255,255,255,.12)}.fluxbot-header{padding:12px;background:" +
    config.primaryColor +
    ';color:#fff;font-weight:700}.fluxbot-messages{flex:1;padding:12px;overflow:auto;background:#020617}.fluxbot-msg{margin:8px 0;padding:10px;border-radius:10px;line-height:1.4;color:#fff;font-size:13px}.fluxbot-bot{background:#1e293b}.fluxbot-user{background:' +
    config.primaryColor +
    ';margin-left:32px}.fluxbot-form{display:flex;gap:8px;padding:10px;border-top:1px solid rgba(255,255,255,.12)}.fluxbot-input{flex:1;background:#0f172a;border:1px solid rgba(255,255,255,.16);color:#fff;border-radius:8px;padding:8px}.fluxbot-send{border:0;border-radius:8px;padding:8px 10px;color:#fff;cursor:pointer;background:' +
    config.primaryColor +
    "}";
  document.head.appendChild(style);

  var container = document.createElement("div");
  container.className = "fluxbot-widget";

  var panel = document.createElement("div");
  panel.className = "fluxbot-panel";

  var header = document.createElement("div");
  header.className = "fluxbot-header";
  header.textContent = config.title;

  var messages = document.createElement("div");
  messages.className = "fluxbot-messages";

  var form = document.createElement("form");
  form.className = "fluxbot-form";

  var input = document.createElement("input");
  input.className = "fluxbot-input";
  input.placeholder = "Escribe tu mensaje";

  var send = document.createElement("button");
  send.className = "fluxbot-send";
  send.type = "submit";
  send.textContent = "Enviar";

  form.appendChild(input);
  form.appendChild(send);

  panel.appendChild(header);
  panel.appendChild(messages);
  panel.appendChild(form);

  var toggle = document.createElement("button");
  toggle.className = "fluxbot-toggle";
  toggle.setAttribute("aria-label", "Abrir chatbot");
  toggle.textContent = "💬";

  container.appendChild(panel);
  container.appendChild(toggle);
  document.body.appendChild(container);

  function appendMessage(text, role) {
    var bubble = document.createElement("div");
    bubble.className = "fluxbot-msg " + (role === "user" ? "fluxbot-user" : "fluxbot-bot");
    bubble.textContent = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  }

  function localReply(message) {
    var text = message.toLowerCase();
    if (text.indexOf("precio") >= 0 || text.indexOf("plan") >= 0) {
      return "Tenemos planes desde 29€/mes. Te compartimos detalle en contacto.";
    }
    if (text.indexOf("instal") >= 0) {
      return "La instalación tarda menos de 5 minutos con el snippet.";
    }
    return "Gracias por tu mensaje. ¿Quieres demo, precios o instalación?";
  }

  appendMessage(config.greeting, "bot");

  toggle.addEventListener("click", function () {
    panel.style.display = panel.style.display === "flex" ? "none" : "flex";
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var userText = input.value.trim();
    if (!userText) return;
    appendMessage(userText, "user");
    input.value = "";

    if (!config.endpoint) {
      appendMessage(localReply(userText), "bot");
      return;
    }

    fetch(config.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: config.token ? "Bearer " + config.token : "",
      },
      body: JSON.stringify({
        message: userText,
      }),
    })
      .then(function (response) {
        if (!response.ok) {
          return Promise.reject(new Error("Endpoint error"));
        }
        return response.json();
      })
      .then(function (data) {
        var reply = data.reply || data.message || "Recibimos tu mensaje.";
        appendMessage(reply, "bot");
      })
      .catch(function () {
        appendMessage("No se pudo conectar al endpoint configurado.", "bot");
      });
  });
})();
