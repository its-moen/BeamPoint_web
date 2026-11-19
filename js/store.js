// Tiny wrapper around localStorage. Everything still works if storage is blocked.
window.BPStore = {
  get: function (k) { try { return JSON.parse(localStorage.getItem(k) || "[]"); } catch (e) { return []; } },
  set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { if (window.BP) window.BP.toast("Could not save in this browser. Your entries will be lost on reload.", "error"); return false; } }
};
