const form = document.getElementById('searchForm');
const spinner = document.getElementById('spinner');
const results = document.getElementById('results');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    results.innerHTML = '';
    spinner.style.display = 'inline-block';

    const city = document.getElementById('cityInput').value;
    const type = document.getElementById('typeSelect').value;

    try {
        const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                apiKey: 'ваш_ключ_API',
                modelName: 'Address',
                calledMethod: 'getWarehouses',
                methodProperties: { CityName: city, TypeOfWarehouseRef: type }
            })
        });

        const data = await response.json();

        if (data.success) {
            data.data.forEach(item => {
                const div = document.createElement('div');
                div.className = 'alert alert-secondary';
                div.textContent = `${item.Description}`;
                results.appendChild(div);
            });
        } else {
            results.innerHTML = '<div class="alert alert-danger">Нічого не знайдено.</div>';
        }
    } catch (error) {
        results.innerHTML = '<div class="alert alert-danger">Помилка запиту.</div>';
    } finally {
        spinner.style.display = 'none';
    }
});
