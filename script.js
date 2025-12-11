
async function getUsers(){
    
    try {
        const rawData = await fetch("https://randomuser.me/api/?results=3")  // Change the result to different number to load more than 3 cards
        const data = await rawData.json()
        
        const usersContainer = document.querySelector(".users");
        usersContainer.innerHTML = "";

        data.results.forEach((user, index)=>{
            
            // Create outer container
            const card = document.createElement("div");

            
            card.className =
            "bg-gray-800 text-white rounded-2xl shadow-xl p-6 flex flex-col items-center transition transform duration-300 hover:scale-105 hover:shadow-2xl opacity-0 card-animate";

            // Avatar
            const img = document.createElement("img");
            img.src = user.picture.large;
            img.alt = "User Avatar";
            img.className = "rounded-full w-24 h-24 border-4 border-gray-700 mb-4";
            card.appendChild(img);

            // Name
            const name = document.createElement("h2");
            name.className = "text-xl font-semibold";
            name.textContent = `${user.name.first} ${user.name.last}`;
            card.appendChild(name);

            // Email
            const email = document.createElement("p");
            email.className = "text-gray-400 text-sm mb-4";
            email.textContent = user.email;
            card.appendChild(email);

            // Stats container
            const stats = document.createElement("div");
            stats.className =
            "w-full flex justify-between text-sm text-gray-300 py-3 border-t border-gray-700 mt-4";

            // ---- Gender block ----
            const genderBlock = document.createElement("div");
            genderBlock.className = "text-center flex-1";

            const genderValue = document.createElement("p");
            genderValue.className = "font-bold text-lg";
            genderValue.textContent = user.gender.charAt(0).toUpperCase() + user.gender.slice(1);

            const genderLabel = document.createElement("p");
            genderLabel.className = "text-gray-400";
            genderLabel.textContent = "Gender";

            genderBlock.appendChild(genderValue);
            genderBlock.appendChild(genderLabel);

            // ---- Age block ----
            const ageBlock = document.createElement("div");
            ageBlock.className = "text-center flex-1 border-l border-gray-700 border-r";

            const ageValue = document.createElement("p");
            ageValue.className = "font-bold text-lg";
            ageValue.textContent = user.dob.age;

            const ageLabel = document.createElement("p");
            ageLabel.className = "text-gray-400";
            ageLabel.textContent = "Age";

            ageBlock.appendChild(ageValue);
            ageBlock.appendChild(ageLabel);

            // ---- Location block ----
            const locationBlock = document.createElement("div");
            locationBlock.className = "text-center flex-1";

            const locationValue = document.createElement("p");
            locationValue.className = "font-bold text-lg";
            locationValue.textContent = user.location.country;

            const locationLabel = document.createElement("p");
            locationLabel.className = "text-gray-400";
            locationLabel.textContent = "Location";

            locationBlock.appendChild(locationValue);
            locationBlock.appendChild(locationLabel);

            // Append blocks
            stats.appendChild(genderBlock);
            stats.appendChild(ageBlock);
            stats.appendChild(locationBlock);

            // Add stats to card
            card.appendChild(stats);

            // Follow button
            const button = document.createElement("button");
            button.className =
            "mt-6 w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-xl transition";
            button.textContent = "Follow";

            card.appendChild(button);

            // Append card to container
            usersContainer.appendChild(card);

            // Small animation delay to make each card appear one after the another
            card.style.animationDelay = `${index * 0.2}s`;

        })
    } catch (err) {
        console.error(err)
    }
}

getUsers();

document.querySelector("#refreshBtn")
.addEventListener("click", async ()=>{
    const icon = document.querySelector("#refreshBtn .material-icons");
    icon.classList.add("spin-refresh");

    await getUsers();

    // Now stop animation
    icon.classList.remove("spin-refresh");
    
})
