alert("injetou 3");
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function comentar() {
  while (true) {
    alert("dentro do while");
    var comment_text = document.getElementsByClassName("Ypffh")[0];
    if (comment_text) {
      var comment_text = document.getElementsByClassName("Ypffh")[0];
      comment_text.click();
      comment_text.focus();
      var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        "value"
      ).set;
      nativeInputValueSetter.call(comment_text, "Vapo vapo");

      var ev2 = new Event("input", { bubbles: true });
      comment_text.dispatchEvent(ev2);
      var submit_button = document.getElementsByClassName("y3zKF")[0];
      submit_button.click();
      await sleep(30000);
    }
  }
}
comentar();
