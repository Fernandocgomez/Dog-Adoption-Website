let hideList = false
let hideSurrender = true
const animalURL = 'http://localhost:3000/api/v1/animals/'
const listingURL = 'http://localhost:3000/api/v1/listings/'
const surTab = document.querySelector('#surrender')
const surSubmit = document.createElement('button')
const animalList = document.querySelector('#animal-list')
const surrenderDiv = document.querySelector('#surrenderDiv')
const myPetDiv = document.querySelector('#myPetDiv')
const animalListingDiv = document.querySelector('#animalListingDiv')

fetch(animalURL)
    .then(res => res.json())
    .then(animalData => {

        animalData.forEach(animal => showAnimals(animal))
    })

///////////////// show animal list start /////////////////////////////////////
function showAnimals(animal) {

    if (animal.status === "Available") {
        const animalCard = document.createElement('div')
        animalCard.className = "card h-100"
        animalCard.id = animal.id

        const animalImg = document.createElement('img')
        animalImg.src = animal.image
        animalImg.className = "card-img-top"
        animalImg.setAttribute("alt", " ")

        const bodyDiv = document.createElement('div')
        bodyDiv.className = "card-body"

        const h4 = document.createElement('h4')
        h4.className = "card-title"
        h4.innerText = animal.name

        const deleteBtn = document.createElement('button')
        deleteBtn.innerText = 'Remove!'
        deleteBtn.className = 'btn btn-danger'


        deleteBtn.addEventListener('click', () => {
            fetch(`http://localhost:3000/api/v1/animals/${animal.id}`, {
                method: "DELETE"
            })
                .then(div.remove())
        })

        const ul = document.createElement('ul')
        ul.setAttribute("style", "text-align: left;")

        const speciesLi = document.createElement('li')
        speciesLi.setAttribute("id", "species")


        const genderLi = document.createElement('li')
        genderLi.setAttribute("id", "gender")


        const ageLi = document.createElement('li')
        ageLi.setAttribute("id", "age")

        const speciesSpan = document.createElement('span')
        speciesSpan.innerText = `Species:${animal.species}`

        const genderSpan = document.createElement('span')
        genderSpan.innerText = `Gender:${animal.gender}`

        const ageSpan = document.createElement('span')
        ageSpan.innerText = `Age:${animal.age}`

        const footerDiv = document.createElement('div')
        footerDiv.className = "card-footer"

        const aTag = document.createElement('a')
        aTag.setAttribute("href", "#")
        aTag.className = "btn btn-success"
        aTag.innerText = "Find Out!"
        aTag.id = animal.id
        aTag.style = 'margin-right: 5px;'


        //////////////////////// Posting new Listing start //////////////////////

        aTag.addEventListener('click', () => {

            animalList.style.display = 'none'

            const divContainerListed = document.createElement('div')
            const divColImg = document.createElement('div')
            const divColDetail = document.createElement('div')

            divContainerListed.className = "row align-items-center my-5"
            divColImg.className = "col-lg-7"
            divColDetail.className = "col-lg-5"

            const animalListedImg = document.createElement('img')
            animalListedImg.className = "img-fluid rounded mb-4 mb-lg-0"
            animalListedImg.src = animal.image
            animalListedImg.alt = ""

            const animalListedName = document.createElement('h1')
            animalListedName.className = "font-weight-light"
            animalListedName.innerText = animal.name

            const animalListedSpecies = document.createElement('ul')
            animalListedSpecies.innerText = `Species: ${animal.species}`

            const animalListedBreed = document.createElement('ul')
            animalListedBreed.innerText = `Breed: ${animal.breed}`

            const animalListedGender = document.createElement('ul')
            animalListedGender.innerText = `Gender: ${animal.gender}`

            const animalListedAge = document.createElement('ul')
            animalListedAge.innerText = `Age: ${animal.age}`

            const animalListedDesc = document.createElement('p')
            animalListedDesc.innerText = animal.description

            const optionForm = document.createElement('form')
            optionForm.className = "task-form"

            const selectOption = document.createElement('select')
            // const optionDefault = document.createElement('option')
            const optionAdopt = document.createElement('option')
            optionAdopt.value = "Adopted"
            optionAdopt.innerText = "Adopt Animal"

            const optionFoster = document.createElement('option')
            optionFoster.value = "Fostered"
            optionFoster.innerText = "Foster Animal"

            const submitOption = document.createElement('input')
            submitOption.type = 'submit'

            divColImg.append(animalListedImg)
            selectOption.append(optionAdopt, optionFoster)
            optionForm.append(selectOption, submitOption)
            divColDetail.append(animalListedName, animalListedSpecies, animalListedBreed, animalListedGender, animalListedAge, animalListedDesc, optionForm)
            divContainerListed.append(divColImg, divColDetail)
            animalListingDiv.append(divContainerListed)

            optionForm.addEventListener('submit', () => {
                event.preventDefault()
                let currentUser = document.querySelector('.text-success')
                let currentAnimalId = animal.id
                let statusChoose = event.target[0].value

                fetch(listingURL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "user_id": currentUser.id,
                        "animal_id": currentAnimalId
                    })
                })
                    .then(res => res.json())
                    .then(addListed => {
                        // .animals.push(addListed)
                        console.log(addListed)
                    })

                fetch(`http://localhost:3000/api/v1/animals/${currentAnimalId}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        'status': statusChoose
                    })
                })
                    .then(res => res.json())
                    .then(updateAnimal => {
                        // animal = updateAnimal
                        ////this is to update the new status for the animal
                        showAnimals(updateAnimal)
                    })
                while (animalListingDiv.firstChild) {
                    animalListingDiv.removeChild(animalListingDiv.firstChild)
                }

                while (animalListingDiv.firstChild) {
                    animalListingDiv.removeChild(animalListingDiv.firstChild)
                }
                animalList.style.display = 'block'
                animalList.removeAttribute('style')
            })
        })
        //////////////////////// Posting new Listing end //////////////////////

        const div = document.createElement('div')
        div.className = "col-lg-3 col-md-6 mb-4"

        speciesLi.append(speciesSpan)
        genderLi.append(genderSpan)
        ageLi.append(ageSpan)
        ul.append(speciesLi, genderLi, ageLi)
        bodyDiv.append(h4, ul)
        footerDiv.append(aTag, deleteBtn)
        animalCard.append(animalImg, bodyDiv, footerDiv)
        div.append(animalCard)
        animalList.append(div)
    }///if statement close off
} /////////////////// show animal list end /////////////////////////////////////

//////////////////////// Posting new animals start //////////////////////
surTab.addEventListener("click", () => {

    while (myPetDiv.firstChild) {
        myPetDiv.removeChild(myPetDiv.firstChild)
    }

    while (animalListingDiv.firstChild) {
        animalListingDiv.removeChild(animalListingDiv.firstChild)
    }

    const form = document.createElement('form')
    console.log('clicked')
    hideList = !hideList
    if (hideList) {
        animalList.style.display = 'none'
        const inputAnimalName = document.createElement('input')
        const inputSpecies = document.createElement('input')
        const inputBreed = document.createElement('input')
        const inputImage = document.createElement('input')
        const inputGender = document.createElement('input')
        const inputAge = document.createElement('input')
        const inputDesc = document.createElement('input')
        const surSubmit = document.createElement('button')

        const br1 = document.createElement('br')
        const br2 = document.createElement('br')
        const br3 = document.createElement('br')
        const br4 = document.createElement('br')
        const br5 = document.createElement('br')
        const br6 = document.createElement('br')
        const br7 = document.createElement('br')

        inputAnimalName.value = ""
        inputAnimalName.placeholder = "Enter a name..."

        inputSpecies.value = ""
        inputSpecies.placeholder = "Enter a Species..."

        inputBreed.value = ""
        inputBreed.placeholder = "Enter a breed..."

        inputImage.value = ""
        inputImage.placeholder = "Enter a imgae url..."

        inputGender.value = ""
        inputGender.placeholder = "Enter a gender..."

        inputAge.value = ""
        inputAge.placeholder = "Enter a age..."

        inputDesc.value = ""
        inputDesc.placeholder = "Enter a description..."

        surSubmit.type = "submit"
        surSubmit.name = "submit"

        surSubmit.innerText = "Surrender Animal"
        surSubmit.className = "submit"
        form.addEventListener('submit', () => {
            event.preventDefault()
            // debugger 
            let animalName = event.target[0].value
            let species = event.target[1].value
            let breed = event.target[2].value
            let image = event.target[3].value
            let gender = event.target[4].value
            let age = event.target[5].value
            let desc = event.target[6].value
            form.reset()
            fetch(animalURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "animal": {
                        "name": animalName,
                        "species": species,
                        "breed": breed,
                        "image": image,
                        "gender": gender,
                        "age": age,
                        "status": "Available",
                        "description": desc
                    }
                })
            })
                .then(res => res.json())
                .then(newAnimal => {
                    showAnimals(newAnimal)
                })
        })

        form.append(inputAnimalName, br1, inputSpecies, br2, inputBreed, br3, inputImage, br4, inputGender, br5, inputAge, br6, inputDesc, br7, surSubmit)
        surrenderDiv.append(form)

    } else {
        while (surrenderDiv.firstChild) {
            surrenderDiv.removeChild(surrenderDiv.firstChild)
        }
        animalList.style.display = 'block'
        animalList.removeAttribute('style')
        console.log("show list")
    }
})

////////////////////////   Sign In Starts Here  //////////////////////////////////////////
const signInForm = document.querySelector('#sign-in-form')

signInForm.addEventListener('submit', () => {
    event.preventDefault()


    fetch('http://localhost:3000/api/v1/users')

        .then(res => res.json())
        .then(users => {
            // users.forEach(data => displayUserOnNavBar(data))
            displayUserOnNavBar(users)
        })

    function displayUserOnNavBar(user) {
        let chosenUser = user.filter(u => u.user_name === signInForm[0].value)
        // console.log(chosenUser)
        const loginBarNameIl = document.querySelector('#login-bar-name')

        if (chosenUser.length == 1) {
            const pUsername = document.createElement('p')
            const dropdownFormSignIn = document.querySelector('#dropdownFormSignIn')
            const navbarDropdownMenuLink = document.querySelector('#navbarDropdownMenuLink')
            const navbarDropdownMenuLinkSignUp = document.querySelector('#navbarDropdownMenuLinkSignUp')
            pUsername.className = 'nav-link'

            const spanUsername = document.createElement('span')
            spanUsername.id = chosenUser[0].id
            spanUsername.innerText = 'Hello, ' + chosenUser[0].first_name + '!'
            spanUsername.className = 'text-success'

            pUsername.append(spanUsername)
            loginBarNameIl.append(pUsername)

            dropdownFormSignIn.style.display = "none";
            navbarDropdownMenuLink.style.display = "none";
            navbarDropdownMenuLinkSignUp.style.display = "none";

            const pLoggout = document.createElement('p')
            pLoggout.className = 'nav-link'
            pLoggout.innerText = 'Log Out'

            const loginBarLogout = document.querySelector('#login-bar-logout')
            loginBarLogout.append(pLoggout)

            const ulNavaBar = document.querySelector('#ulNavaBar')
            // <li class="nav-item">
            //     <a class="nav-link" href="#">My Pets</a>
            // </li> 

            const liNavaBar = document.createElement('li')
            liNavaBar.className = 'nav-item'

            ////////////////////////////////////////////My pets start///////////////////////////////

            liNavaBar.addEventListener('click', () => {
                animalList.style.display = 'none'
                console.log(user)

                while (myPetDiv.firstChild) {
                    myPetDiv.removeChild(myPetDiv.firstChild)
                }

                while (surrenderDiv.firstChild) {
                    surrenderDiv.removeChild(surrenderDiv.firstChild)
                }

                while (animalListingDiv.firstChild) {
                    animalListingDiv.removeChild(animalListingDiv.firstChild)
                }


                let loggedInCurrentUser = document.querySelector('.text-success')
                console.log(loggedInCurrentUser.id)
                console.log(user.filter(data => data.id == loggedInCurrentUser.id))
                let listOfUserInfo = user.filter(data => data.id == loggedInCurrentUser.id)

                let userAnimals = listOfUserInfo[0].animals

                // fetch(animalURL)
                // .then(res => res.json())
                // .then(animalData => {
                //     animalData.forEach(animal => showAnimals(animal))
                // })

                fetch(`http://localhost:3000/api/v1/users/${loggedInCurrentUser.id}`)
                    .then(res => res.json())
                    .then(user => {
                        let userAnimals = user.animals
                        userAnimals.forEach(animal => {

                            const myDivCol = document.createElement('div')
                            myDivCol.className = "col-lg-3 col-md-6 mb-4"

                            const myAnimalCard = document.createElement('div')
                            myAnimalCard.className = "card h-100"
                            myAnimalCard.id = animal.id

                            const myAnimalImg = document.createElement('img')
                            myAnimalImg.src = animal.image
                            myAnimalImg.className = "card-img-top"
                            myAnimalImg.setAttribute("alt", " ")

                            const myBodyDiv = document.createElement('div')
                            myBodyDiv.className = "card-body"

                            const myH4 = document.createElement('h4')
                            myH4.className = "card-title"
                            myH4.innerText = animal.name

                            const myUl = document.createElement('ul')
                            myUl.setAttribute("style", "text-align: left;")

                            const myLiSpecie = document.createElement('li')
                            myLiSpecie.id = "specie"

                            const mySpanSpecie = document.createElement('span')
                            mySpanSpecie.innerText = `Specie: ${animal.species}`

                            const myLiGender = document.createElement('li')
                            myLiGender.id = "gender"

                            const mySpanGender = document.createElement('span')
                            mySpanGender.innerText = `Gender: ${animal.gender}`

                            const myLiAge = document.createElement('li')
                            myLiAge.id = "age"

                            const mySpanAge = document.createElement('span')
                            mySpanAge.innerText = `Age: ${animal.age}`

                            const myLiStatus = document.createElement('li')
                            myLiStatus.id = "status"

                            const mySpanStatus = document.createElement('span')
                            mySpanStatus.innerText = `Status: ${animal.status}`

                            myLiSpecie.append(mySpanSpecie)
                            myLiGender.append(mySpanGender)
                            myLiAge.append(mySpanAge)
                            myLiStatus.append(mySpanStatus)

                            myUl.append(myLiSpecie, myLiGender, myLiAge, mySpanStatus)

                            myBodyDiv.append(myH4, myUl)

                            myAnimalCard.append(myAnimalImg, myBodyDiv)

                            myDivCol.append(myAnimalCard)

                            myPetDiv.append(myDivCol)

                        })
                    })
            })//////////////////////////My pets end///////////////////////////////

            const aNavaBar = document.createElement('a')
            aNavaBar.className = 'nav-link'
            aNavaBar.innerText = 'My Pets'

            liNavaBar.append(aNavaBar)

            ulNavaBar.insertBefore(liNavaBar, ulNavaBar.children[1])

            loginBarLogout.addEventListener('click', () => {
                // window.location.reload(false); 
                loginBarNameIl.innerHTML = ""
                navbarDropdownMenuLink.style.display = "block";
                navbarDropdownMenuLinkSignUp.style.display = "block";
                // dropdownFormSignIn.style.display = "block";
                loginBarLogout.innerHTML = ""

                navbarDropdownMenuLink.addEventListener('click', () => {
                    dropdownFormSignIn.style.display = "block";
                })

                liNavaBar.style.display = 'none'


            })


        } else {
            const errorMessageForm = document.querySelector('#error-message-form')

            const pFormSingIn = document.createElement('p')
            pFormSingIn.innerText = "Wrong Username"
            pFormSingIn.className = "text-danger"

            errorMessageForm.append(pFormSingIn)

        }


    }
})////////////// Sign In Finshes Here /////////// 


//////////////// Sign Up Starts Here /////////////

const singupFormDropdown = document.querySelector('#sigupUser')
const urlUsers = 'http://localhost:3000/api/v1/users/'
const formSigUpClassDropdown = document.querySelector('#formSigUpClassDropdown')

singupFormDropdown.addEventListener('submit', () => {
    event.preventDefault()
    // debugger 
    let userNameForm = event.target[0].value
    let firstNameForm = event.target[1].value
    let lastNameForm = event.target[2].value
    let emailForm = event.target[3].value
    let addressForm = event.target[4].value
    let phoneForm = event.target[5].value
    fetch(urlUsers, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "user": {
                "user_name": userNameForm,
                "first_name": firstNameForm,
                "last_name": lastNameForm,
                "email": emailForm,
                "address": addressForm,
                "phone_num": phoneForm
            }
        })
    })
    event.target.reset()
    formSigUpClassDropdown.style.display = 'none';
    dropdownFormSignIn.style.display = 'block';

    const messageToSigIn = document.createElement('p')
    messageToSigIn.innerText = 'Plase Type Your User Name To Log In'


    dropdownFormSignIn.append(messageToSigIn)

    const navbarNavDropdown = document.querySelector('#navbarNavDropdown')


    // <li class="nav-item">
    //     <a class="nav-link" href="#">My Pets</a>
    // </li>

})//////////////// Sign Up Ends Here /////////////

/////////////////////////Redirect to the index when logo or home is cliked ///////////////////////


const homeNav = document.querySelector('#homeNav')
const logoNav = document.querySelector('#logoNav')

homeNav.addEventListener('click', () => {
    console.log('click on the nav bar')
    animalList.style.display = 'block'
    animalList.removeAttribute("style")

    while (myPetDiv.firstChild) {
        myPetDiv.removeChild(myPetDiv.firstChild)
    }

    while (surrenderDiv.firstChild) {
        surrenderDiv.removeChild(surrenderDiv.firstChild)
    }

    while (animalListingDiv.firstChild) {
        animalListingDiv.removeChild(animalListingDiv.firstChild)
    }
})

logoNav.addEventListener('click', () => {
    console.log('click on the nav bar')
    animalList.style.display = 'block'
    animalList.removeAttribute("style")

    while (myPetDiv.firstChild) {
        myPetDiv.removeChild(myPetDiv.firstChild)
    }

    while (surrenderDiv.firstChild) {
        surrenderDiv.removeChild(surrenderDiv.firstChild)
    }

    while (animalListingDiv.firstChild) {
        animalListingDiv.removeChild(animalListingDiv.firstChild)
    }
})

/////////////////////////Redirect to the index when logo or home is cliked finish ///////////////////////