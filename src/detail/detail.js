import { getSingleAd, getUser,logout } from '../config/firebase.js'
import{auth,onAuthStateChanged} from '../../index.js'


onAuthStateChanged(auth, (user) => {



    if (user) {
        const emailElement = document.getElementById('email')
        emailElement.innerHTML = user.email
        // emailElement.innerHTML = user.title
        console.log(user);
        
getAdDetail()
} else {
        alert('User Is Logged Out')
        location.href = '../../login.html'
    }
})
// getAdDetail()

async function getAdDetail() {
    const adId = location.search.slice(6)

    const ad = await getSingleAd(adId)
    const user = await getUser(ad.uid)
    console.log('user', user)

    const container = document.getElementById('container')

    const card = document.createElement('div')
    card.className = 'card'
card.style.alignItems='center'
// card.style.marginTop='24px'
card.style.margin='24px'
card.style.width='66em'
    const img = document.createElement('img')
    img.src = ad.image
    card.style.background='transparent'
    img.style.width = '300px'
    img.style.height = '300px'
    img.style.border='3px solid red'
    card.style.border='2px solid black'
    const title = document.createElement('h3')
    title.innerHTML = ad.title

    const amount = document.createElement('h4')
    amount.innerHTML = `Rs. ${ad.amount}`

    const description = document.createElement('p')
    description.innerHTML = ad.description
    // const titleheading=createElement('h5')
    // titleheading.innerHTML='description'
    description.style.backgroundColor='pink'

    // const contact = document.createElement('h3')
    // contact.innerHTML = 'Contact Information'

    const username = document.createElement('h4')
    // username.innerHTML = user.fullname
    // card.append(contact)
    card.append(username)
    card.append(img)
    card.append(title)
    card.append(amount)
    card.append(description)


    container.append(card)
}


window.signout = function() {
    logout()
}