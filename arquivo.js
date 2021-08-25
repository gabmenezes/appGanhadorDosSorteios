let ordemMarcacao = checkBoxAntes ? "antes" : "depois";
      const data = {
        tempo_comentario: "45",
        comentario: textoComentario,
        repetirMarcacao: checkBoxRepetirMarcacao,
        linkSorteio: linkSorteio,
        antesOuDepois: ordemMarcacao,
        podeComentar: true,
        qtdComentarios: 0,
        marca_usuario: checkBoxPerfis,
        indexPerfil: 0,
        lista_usuario_marcar: listaPerfis,
      };


// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

async function sleep(seconds) 
{
  var e = new Date().getTime() + (seconds * 1000);
  while (new Date().getTime() <= e) {
  }
}


function construirComentario(dados) {
    if (dados.marca_usuario) {
      var comment = dados.lista_usuario_marcar.map((usuario) => {
        return `@${usuario.trim()} ${dados.comentario}` 
      });
  
      if (dados.antes_depois.includes('depois')) {
        comment = dados.lista_usuario_marcar.map((usuario) => {
          return `${dados.comentario} @${usuario.trim()}` 
        });
      }
  
      return comment;
    }
  
    return [dados.comentario];
  }



// async function comentar() {

//   var i = 0;
//   while (true) {
//     // alert("dentro do while");
//     var comment_text = document.getElementsByClassName("Ypffh")[0];
//     if (comment_text) {
//       var comment_text = document.getElementsByClassName("Ypffh")[0];
//       comment_text.click();
//       comment_text.focus();
//       var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
//         window.HTMLTextAreaElement.prototype,
//         "value"
//       ).set;
//       nativeInputValueSetter.call(comment_text, "${data.textoComentario}");

//       var ev2 = new Event("input", { bubbles: true });
//       comment_text.dispatchEvent(ev2);
//       var submit_button = document.getElementsByClassName("y3zKF")[0];
//       submit_button.click();
//     //   await sleep(${data.tempoComentario*1000});
//       i = i+1
//     }
//     // await sleep(30000);
//   }
// }
// comentar();

const comentar = async (dados) => {
    try {
      let comentarioCompleto = construirComentario(dados);
   
      for (const comentarioAtual of comentarioCompleto) {
        var comment_text = document.getElementsByClassName("Ypffh")[0];
        if (comment_text) {
            var comment_text = document.getElementsByClassName("Ypffh")[0];
      comment_text.click();
      comment_text.focus();
      var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        "value"
      ).set;
      nativeInputValueSetter.call(comment_text, comentarioAtual);
      var ev2 = new Event("input", { bubbles: true });
      comment_text.dispatchEvent(ev2);
      var submit_button = document.getElementsByClassName("y3zKF")[0];
      submit_button.click();
        
        // console.log(`Comentário enviado ao post: ${comentarioAtual} às ${new Date()}`);
        await sleep(dados.tempo_comentario);
  
        if (!dados.repetir_marcacao) {
          comentarioCompleto = [dados.comentario]
        }
    }
      }
      if (!dados.repetir_marcacao) {
        dados.marca_usuario = false;
      }
      comentar(dados);
  
    }catch (e) {
      console.log(e);
    }
  }
  
  function construirComentario(dados) {
    if (dados.marca_usuario) {
      var comment = dados.lista_usuario_marcar.map((usuario) => {
        return `@${usuario.trim()} ${dados.comentario}` 
      });
  
      if (dados.antes_depois.includes('depois')) {
        comment = dados.lista_usuario_marcar.map((usuario) => {
          return `${dados.comentario} @${usuario.trim()}` 
        });
      }
  
      return comment;
    }
  
    return [dados.comentario];
  }


  ///// vapooooo

  alert("noviususas")
  function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

  function construirComentario(dados) {
    if (dados.marca_usuario) {
      var comment = dados.lista_usuario_marcar.map((usuario) => {
        return '@'+ usuario.trim()+ ' ' + dados.comentario 
      });
      
      if (dados.antes_depois.includes('depois')) {
        comment = dados.lista_usuario_marcar.map((usuario) => {
          return dados.comentario+ ' ' + '@' + usuario.trim() 
        });
      }
      
      return comment;
    }
    
    return [dados.comentario];
  }

  async function comentar(args) {
    var checkExist = setInterval(async function() {
      if (document.getElementsByClassName("Ypffh")[0]) {
         clearInterval(checkExist);
      }
   }, 100)
   if(checkExist){
     alert("vem muie")
     var comment_text = document.getElementsByClassName("Ypffh")[0];
     if(comment_text){
       let comentarioCompleto = construirComentario(args);
       for (var comentarioAtual of comentarioCompleto) {

       var comment_text = document.getElementsByClassName("Ypffh")[0];
       comment_text.click();
       comment_text.focus();
       var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
         window.HTMLTextAreaElement.prototype,
         "value"
       ).set;
       nativeInputValueSetter.call(comment_text, comentarioAtual);
 
       var ev2 = new Event("input", { bubbles: true });
       comment_text.dispatchEvent(ev2);
       var submit_button = document.getElementsByClassName("y3zKF")[0];
       submit_button.click();
       await sleep(args.tempo_comentario * 1000);
      }
      if (!args.repetir_marcacao) {
        args.marca_usuario = false;
      }
      await comentar(args)
      }
     }  
    }
    comentar(${JSON.stringify(data)})