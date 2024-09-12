let stock = {};

function addItem() {
    const name = document.getElementById('item-name').value.trim();
    const quantity = parseInt(document.getElementById('item-quantity').value);

    if (name && !isNaN(quantity) && quantity > 0) {
        if (stock[name]) {
            stock[name] += quantity;
        } else {
            stock[name] = quantity;
        }
        updateStockTable();  // Atualiza a tabela de estoque
        updateSelectOptions();  // Atualiza as opções dos selects
        document.getElementById('item-name').value = '';
        document.getElementById('item-quantity').value = '';
    } else {
        alert('Por favor, insira um nome e uma quantidade válida.');
    }
}

function removeItem() {
    const name = document.getElementById('remove-item-name').value;
    const quantity = parseInt(document.getElementById('remove-item-quantity').value);

    if (name && !isNaN(quantity) && quantity > 0) {
        if (stock[name]) {
            const confirmRemoval = confirm('Tem certeza que deseja remover ${quantity} de ${name}?');
            if (confirmRemoval) {
                stock[name] -= quantity;
                if (stock[name] <= 0) {
                    delete stock[name];
                }
                updateStockTable();  // Atualiza a tabela de estoque
                updateSelectOptions();  // Atualiza as opções dos selects
                document.getElementById('remove-item-quantity').value = '';
            }
        } else {
            alert('Item não encontrado no estoque.');
        }
    } else {
        alert('Por favor, selecione um item e insira uma quantidade válida.');
    }
}

function editItem() {
    const name = document.getElementById('edit-item-name').value;
    const newName = document.getElementById('edit-new-item-name').value.trim();
    const quantity = parseInt(document.getElementById('edit-item-quantity').value);

    if (name && (!isNaN(quantity) || newName)) {
        if (stock[name]) {
            if (newName) {
                stock[newName] = stock[name];
                delete stock[name];
            }
            if (!isNaN(quantity)) {
                stock[newName || name] = quantity;
            }
            updateStockTable();  // Atualiza a tabela de estoque
            updateSelectOptions();  // Atualiza as opções dos selects
            document.getElementById('edit-new-item-name').value = '';
            document.getElementById('edit-item-quantity').value = '';
        } else {
            alert('Item não encontrado no estoque.');
        }
    } else {
        alert('Por favor, insira um novo nome ou quantidade válida.');
    }
}
function updateStockTable() {
    const stockTable = document.getElementById('stock-list');
    stockTable.innerHTML = '';  // Limpa a tabela antes de preenchê-la novamente

    // Verifica se há itens no estoque
    if (Object.keys(stock).length === 0) {
        const row = document.createElement('tr');
        const emptyCell = document.createElement('td');
        emptyCell.colSpan = 2;
        emptyCell.textContent = 'Estoque vazio';
        row.appendChild(emptyCell);
        stockTable.appendChild(row);
    } else {
        for (const [name, quantity] of Object.entries(stock)) {
            const row = document.createElement('tr');

            // Cria a célula do nome do item
            const nameCell = document.createElement('td');
            nameCell.textContent = name;
            row.appendChild(nameCell);

            // Cria a célula da quantidade
            const quantityCell = document.createElement('td');
            quantityCell.textContent = quantity;
            row.appendChild(quantityCell);

            // Adiciona a linha à tabela
            stockTable.appendChild(row);
        }
    }
}

function updateSelectOptions() {
    const removeSelect = document.getElementById('remove-item-name');
    const editSelect = document.getElementById('edit-item-name');

    removeSelect.innerHTML = '<option value="">Selecione um item</option>';
    editSelect.innerHTML = '<option value="">Selecione um item</option>';

    for (const name of Object.keys(stock)) {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        removeSelect.appendChild(option);
        editSelect.appendChild(option.cloneNode(true));  // Clona a opção para usar no select de edição
    }
}

function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section.style.display === "none" || section.style.display === "") {
        section.style.display = "block";
    } else {
        section.style.display = "none";
    }
}

// Inicializar ocultando as seções de retirada e edição
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('remove-section').style.display = 'none';
    document.getElementById('edit-section').style.display = 'none';
});