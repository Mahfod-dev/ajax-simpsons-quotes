console.log('hello')

const divEl = document.querySelector('.content')

const url = 'https://simpsons-quotes-api.herokuapp.com/quotes'

const apiSimpson = async () => {
	showSpinner()
	try {
		const response = await axios.get(url)
		console.log(response)
		if (response.status !== 200) {
			throw new Error('Error to load')
		}
		const simpsonQuote = response.data

		const newQuote = simpsonQuote
			.map((simpson) => {
				const { quote, character, image } = simpson

				const newHtml = `
                <h2>${character}</h2>
                <img src="${image}" alt=${character} />
                <p><span>${quote}</span></p>
            
            `

				return newHtml
			})
			.join(' ')
		hideSpinner()
		divEl.insertAdjacentHTML('afterbegin', newQuote)
		createElement()
	} catch (error) {
		console.log(error)
	}
}

function createElement() {
	const btn = document.createElement('button')
	divEl.appendChild(btn)

	btn.textContent = 'Random Quote'

	btn.style.cssText = `
    color : yellow;
    background-color :red;
    border:1px solid red;
    padding : 5px;
    border-radius : 5px;
    `

	btn.addEventListener('click', () => location.reload())
}

function showSpinner() {
	const markup = `
      <div class="spinner">
        <div class='loader'>
          </div>
        </div>
     `

	document.body.insertAdjacentHTML('afterbegin', markup)
}

function hideSpinner() {
	document.querySelector('.spinner').remove()
}

apiSimpson()
