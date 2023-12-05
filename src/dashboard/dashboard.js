import { auth, onAuthStateChanged } from '../../index.js'
import { getAds, logout } from '../config/firebase.js'

onAuthStateChanged(auth, (user) => {



    if (user) {
        const emailElement = document.getElementById('email')
        emailElement.innerHTML = user.email
        // emailElement.innerHTML = user.title
        console.log(user);
        
        renderAds()
    } else {
        alert('User Is Logged Out')
        location.href = '../../login.html'
    }
})

async function renderAds() {

// alert("Welcome")
    const ads = await getAds()
    const container = document.getElementById('container')

    for (var i = 0; i < ads.length; i++) {
        const ad = ads[i]

        const card = document.createElement('div')
        card.className = 'card'
        card.onclick = function () {
            location.href = '../detail/detail.html?adId=' + ad.id
        }

        const img = document.createElement('img')
        img.src = ad.image
        img.style.width = '100px'
        img.style.height = '100px'

        const title = document.createElement('h3')
        title.innerHTML = ad.title

        const amount = document.createElement('h4')
        amount.innerHTML = `Rs. ${ad.amount}`

        card.append(img)
        card.append(title)
        card.append(amount)

        container.append(card)
    }
}

window.signout = function() {
    logout()
}


window.sortBy=async function(event){
const sortBy=event.target.value

if(!sortBy){
   renderAds()
}else{
    const ads=await sortAds(sortBy)
    renderAdsItems(ads)
}
}


//sir presentation bhool gaye kia ?