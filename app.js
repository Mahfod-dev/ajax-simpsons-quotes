console.log('hello')

const divEl = document.querySelector('.content')

const url = 'https://simpsons-quotes-api.herokuapp.com/quotes'

const apiSimpson = async () => {
	try {
		const response = await axios.get(url)
		console.log(response.data)

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

		divEl.insertAdjacentHTML('afterbegin', newQuote)

		if (response.statusCode !== 200) {
			throw new Error('Error to load')
		}
	} catch (error) {
		console.log(error)
	}
}

apiSimpson()
