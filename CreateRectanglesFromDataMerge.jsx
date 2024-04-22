// Verificando se há um documento aberto
if (app.documents.length == 0) {
    alert("Por favor, abra um documento no InDesign e tente novamente.");
} else {
    // Verificando se há uma fonte de dados
    if (app.activeDocument.dataMergeProperties.dataMergePreferences.dataMergeResource == null) {
        alert("Por favor, vincule um arquivo de fonte de dados e tente novamente.");
    } else {
        // Inicializando o objeto de origem de dados
        var dataMerge = app.activeDocument.dataMergeProperties.dataMergePreferences.dataMergeResource;

        // Iterando através dos registros
        for (var i = 0; i < dataMerge.recordCount; i++) {
            // Configurando o registro atual
            dataMerge.mergeRecords(i);

            // Pegando o valor do campo de dados mesclados
            var fieldValue = dataMerge.recordAsText().contents;

            // Dividindo o valor do campo em caracteres
            var digits = fieldValue.split("");

            // Verificando se o campo tem 11 caracteres
            if (digits.length !== 11) {
                alert("O campo não tem 8 caracteres. Por favor, revise seus dados e tente novamente.");
                exit();
            }

            // Iterando através dos dígitos
            for (var j = 0; j < digits.length; j++) {
                // Convertendo o dígito atual para um número
                var xPosition = parseFloat(digits[j]);

                // Criando um quadrado na posição X
                var square = app.activeDocument.pages.item(0).rectangles.add({
                    geometricBounds: [10, 10, 50, 50], // Mudar para as dimensões desejadas do quadrado
                    strokeWeight: 0,
                    fillColor: "Black"
                });

                // Posicionando o quadrado
                square.move([(xPosition * 60) + (j * 70), 100]); // 60 é a largura do quadrado, 70 é a margem entre cada quadrado
            }
        }
        alert("Quadrados criados com sucesso com base nos valores dos campos de dados mesclados!");
    }
}
