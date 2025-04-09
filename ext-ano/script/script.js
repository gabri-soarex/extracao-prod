document.addEventListener('DOMContentLoaded', function () {
    const runQueryButton = document.querySelector('button[onclick="RunQuery()"]');
    const queryResults = document.getElementById('queryResults');
    const downloadLink = document.getElementById('downloadLink');
  
    runQueryButton.addEventListener('click', function () {
      const ano = document.getElementById("ano").value;
      const idAtivo = document.getElementById("id_ativo").value;
      const query = document.getElementById('consultaFormatada').value;
  
      fetch('NOME-DA-API', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ano, idAtivo, query }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.download_link) {
          downloadLink.href = data.s3_url;
          queryResults.style.display = 'block';
          queryResults.innerText = 'Extração iniciada, aguarde o link para Download!';
        } else {
          queryResults.style.display = 'none';
        }
      })
      .catch(error => {
        console.error('Erro na solicitação à API:', error);
      });
    });
  });
  
  function formatarConsulta() {
    const ano = document.getElementById("ano").value;
    const idAtivo = document.getElementById("id_ativo").value;
  
    const consulta = `SELECT * FROM extracoes WHERE ano = '${ano}' AND id_ativo = '${idAtivo}';`;
  
    document.getElementById("consultaFormatada").value = consulta;
    document.getElementById("query").value = consulta;
  }
  
  function limparCampos() {
    document.getElementById("ano").value = "";
    document.getElementById("id_ativo").value = "";
    document.getElementById("consultaFormatada").value = "";
    document.getElementById("query").value = "";
    document.getElementById("queryResults").style.display = "none";
  }
  