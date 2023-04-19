<template>
  <div>
    <!-- <div class="input-group">
        <span class="input-group-text" id="basic-addon1">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
        </svg>
        </span>
        <input type="text" class="form-control" placeholder="Search" aria-label="Input group example" aria-describedby="basic-addon1">
    </div> -->

    <!-- sidebar-->
    <div
      class="d-flex flex-column flex-shrink-0 p-3 bg-light"
      style="width: 100%"
    >
      <button class="btn-primary">Search</button>
      <hr />
      <div class="userList">
        <ul class="nav flex-column mb-auto">
          <li class="nav-item" v-for="dummy in dummyUsers" :key="dummy">
            <button>
              {{ dummy }}
            </button>
          </li>
        </ul>
      </div>
      <hr />
      <div class="dropdown">
        <a
          href="#"
          class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
          id="dropdownUser2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            class="rounded-circle me-2"
          />
          <strong>mdo</strong>
        </a>
        <ul
          class="dropdown-menu text-small shadow"
          aria-labelledby="dropdownUser2"
        >
          <li><a class="dropdown-item" href="#">New project...</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li><hr class="dropdown-divider" /></li>
          <li><a class="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: null,
      dummyUsers: [
        "Mandem",
        "Mischa",
        "Noah",
        "Dato",
        "Ben",
        "Mandem",
        "Mischa",
        "Noah",
        "Dato",
        "Ben",
      ],
    };
  },
  computed: {
    listOfUsers() {
      return this.$store.getters.getCurrentUsers();
    }
  },
  methods: {

    searchFunction() {
    // TODO: use v-model to bind the input box and make the searchbar search instantaeneausly
    }
    ,stayActive() {
      // when button is clicked, so when its active
      // it should stay active until a different button is clicked
    }
  },
};
</script>

<style scoped>
.userList {
  height: 350px;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
}

.userList li {
  /* margin: 5px; */
}

.userList ul li button {
  display: inline-block;
  padding: 8px 12px;
  /* border-radius: 5px; */
  border: none;
  background-color: white;
  color: black;
  cursor: pointer;
  width: 100%;
}

.userList ul li button:focus,
.userList ul li button:active {
  background-color: #007AFE !important;
  color: white;
  outline: none;
}


</style>
