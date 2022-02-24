// declare variables

const avatar = document.querySelector(".img");
const name = document.querySelector(".fname");
const username = document.querySelector(".username");
const discription = document.querySelector(".discription");
const following = document.querySelector(".following");
const follower = document.querySelector(".follower");
const gps = document.querySelector(".gps");
const repo1Heading = document.querySelector(".repo1-heading");
const repo1Disc = document.querySelector(".repo1-disc");
const repo2Heading = document.querySelector(".repo2-heading");
const repo2Disc = document.querySelector(".repo2-disc");
const repo3Heading = document.querySelector(".repo3-heading");
const repo3Disc = document.querySelector(".repo3-disc");

const query = document.querySelector("#search");

const error = document.querySelector(".error");

const wrapper = document.querySelector("#wrapper");

// window.addEventListener("load", () => {
//   console.log("All assets are loaded");
//   wrapper.style.display = "none";
// });
const animite = document.querySelector(".animate");

query.addEventListener("keyup", (e) => {
  const baseURL = `https://api.github.com/users/${query.value}`;
  const repoURL = `https://api.github.com/users/${query.value}/repos`;

  if (e.keyCode === 13) {
    // e.preventDefault();
    query.value = "";
  
    // fetch API basic info

    const fetchUser = async () => {
      const response = await fetch(baseURL);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      // NO RESPONSE !!!
      else {
        // hide wrapper
        wrapper.style.display = 'none'

        // hide animate
        animite.style.display = 'none'

        // show error
        error.style.display = "block";
        query.style.borderBottomColor = "red";

        // set timeout
        setTimeout(() => {
          error.style.display = "none";
          query.style.borderBottomColor = "black";
        }, 2000);
      }
    };
    fetchUser()
      .then((data) => {
        // hide wrapper
        wrapper.style.display = 'flex'
        wrapper.style.marginLeft = '380px'
        wrapper.style.transition = '0.3s'

        // animate
        animite.style.display = 'none'
        
        name.textContent = data.name;
        username.textContent = data.login;
        discription.textContent = data.bio;
        following.textContent = data.following;
        follower.textContent = data.followers;
        gps.textContent = data.location;
        avatar.src = data.avatar_url;
      })
      .catch((error) => console.log(error));

    //   fethc user repos

    const fetchRepo = async () => {
      const response = await fetch(repoURL);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    };
    fetchRepo()
      .then((data) => {
        console.log(data);

        // repo 1
        repo1Heading.textContent = data[0].name;
        repo1Disc.textContent = data[0].visibility;

        // repo 2
        repo2Heading.textContent = data[1].name;
        repo2Disc.textContent = data[1].visibility;

        // repo 3
        repo3Heading.textContent = data[2].name;
        repo3Disc.textContent = data[2].visibility;
      })
      .catch((error) => console.log(error));
  }
});

