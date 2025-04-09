function formatarConsulta() {
    const ano = document.getElementById('ano').value.trim();
    const mesInicial = document.getElementById('mesInicial').value.trim();
    const mesFinal = document.getElementById('mesFinal').value.trim();
    const id = document.getElementById('id_ativo').value.trim();

    if (!id) {
        alert("Por favor, preencha o campo 'Consulta ID'.");
        return;
    }

    const query1 = `-- Verificar se o ID existe\nSELECT EXISTS (\n    SELECT 1\n    FROM "fulltrack"."tbl_tracking"\n    WHERE id_ativo = ${id}\n);\n`;

    let query2 = `\n-- Consulta com filtros\nSELECT *\nFROM "fulltrack"."tbl_tracking"\nWHERE`;
    let conditions = [];

    if (ano) conditions.push(` year = '${ano}'`);

    if (mesInicial && mesFinal) {
        const meses = [];
        const start = parseInt(mesInicial);
        const end = parseInt(mesFinal);
        for (let m = start; m <= end; m++) {
            meses.push(`'${m}'`);
        }
        conditions.push(` month IN (${meses.join(', ')})`);
    }

    conditions.push(` id_ativo = ${id}`);
    query2 += conditions.join(' AND') + `\nORDER BY dt_gps;`;

    document.getElementById('consultaFormatada').value = query1 + query2;
}

function limparCampos() {
    document.getElementById('ano').value = '';
    document.getElementById('mesInicial').value = '';
    document.getElementById('mesFinal').value = '';
    document.getElementById('id_ativo').value = '';
    document.getElementById('consultaFormatada').value = '';
}
