const API_URL = 'http://localhost:4000/api/items'

document.getElementById('dataForm').addEventListener('submit', async function (event) {
    event.preventDefault()

    const name = document.getElementById('name').value
    const position = document.getElementById('position').value

    if (name && position) {
        const newItem = { name, position }
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newItem)
            })

            if (response.ok) {
                await fetchData()
                document.getElementById('dataForm').reset()
            }


        } catch (error) {
            console.log('Error')
        }

    }
})

async function fetchData() {
    try {
        const response = await fetch(API_URL)
        const data = await response.json()
        renderData(data)
    } catch (error) {
        console.log('Error')
    }
}

function renderData(data) {
    const resultDiv = document.getElementById('result')
    resultDiv.innerHTML = ''

    data.forEach((item, index) => {
        const cardDiv = document.createElement('div')
        cardDiv.classList.add('card')
        cardDiv.innerHTML = `
             <div class="card-body ${item.completed ? 'bg-success text-white' : ''}">
                <h5 class="card-title">Имя: ${item.name}</h5>
                <p class="card-text">Должность: ${item.position}</p>
                <button class="btn btn-success mr-2" onclick="markItem(${index})" ${item.completed ? 'disabled' : ''}>Отметить</button>
                <button class="btn btn-danger" onclick="deleteItem(${index})">Удалить</button>
            </div>
        `
        resultDiv.appendChild(cardDiv)
    });
}

async function deleteItem(index) {
    try {
        const response = await fetch(`${API_URL}/${index}`, {
            method: 'DELETE'
        })

        if (response.ok) {
            await fetchData()
        }else {
            alert('Ошибка')
        }
    } catch (error) {
        console.log('Error')   
    }
}

async function markItem(index) {
    try {
        const response = await fetch(`${API_URL}/${index}`, {
            method: 'PUT'
        });

        if (response.ok) {
            await fetchData();
        } else {
            alert('Ошибка при отметке');
        }
    } catch (error) {
        console.log('Error:', error);
    }
}


fetchData()