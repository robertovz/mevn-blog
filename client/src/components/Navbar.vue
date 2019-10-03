<template>
  <div class="nav-wrapper">
    <nav class="navbar navbar-expand-lg nav-bottom">
      <div class="container">
        <a class="navbar-brand" href="#">
          <span class="text-brand">
            <span class="font-weight-bold">Ex</span>ample
          </span>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class>
            <i class="fas fa-bars white" style="color: #fff; font-size: 20px;"></i>
          </span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/" class="nav-link">
                Home
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li class="nav-item">
              <a href class="nav-link">Blog</a>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/posts">Posts</router-link>
            </li>
            <li class="nav-item">
              <a href class="nav-link">About</a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >My Account</a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link
                  to="/login"
                  class="dropdown-item"
                  v-if="auth=='' && (user==null || user==undefined)"
                >Login</router-link>

                <router-link
                  to="/register"
                  class="dropdown-item"
                  v-if="auth=='' && (user==null || user==undefined)"
                >Register</router-link>
                <a
                  v-if="auth=='loggedIn' || (user!=null || user!=undefined)"
                  class="dropdown-item"
                  href="/userboard"
                >Profile</a>
                <a
                  v-if="auth=='loggedIn' || (user!=null || user!=undefined)"
                  class="dropdown-item"
                  href
                  @click="logout"
                >Logout</a>
              </div>
            </li>
          </ul>
        </div>
        <ul class="navbar-nav-top ml-auto d-flex">
          <li v-if="auth=='' && (user==null || user==undefined)" class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li v-if="auth=='' && (user==null || user==undefined)" class="nav-item">
            <router-link to="/register" class="nav-link">Register</router-link>
          </li>
          <li v-if="auth=='loggedIn' || (user!=null || user!=undefined)" class="nav-item">
            <a class="nav-link" href="/userboard">Profile</a>
          </li>
          <li v-if="auth=='loggedIn' || user!=null || user!=undefined" class="nav-item">
            <a class="nav-link" href="#" @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      auth: "",
      user: localStorage.usertoken
    };
  },
  methods: {
    logout() {
      this.$router.push("/");
      this.$router.go();
      localStorage.removeItem("usertoken");
    }
  },

  mounted() {
    Fire.$on("logged-in", status => {
      this.auth = status;
    });
  },

  created() {
    window.addEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="scss">
.nav-bottom {
  z-index: 10;
  height: 60px;
  right: 0;
  left: 0;
  background: #1b81d6 !important;
  border-bottom: 1px solid grey;

  .navbar-brand,
  .nav-link {
    color: #fff;
  }

  .nav-link {
    font-weight: 600;
  }

  .navbar-nav-top {
    text-decoration: none;
    list-style: none;
    margin-top: 15px;

    .nav-link {
      margin: 0;
    }
  }
}
@media screen and (max-width: 991px) {
  .nav-bottom {
    top: 0px !important;
    margin-top: 0px !important;
    background: #111 !important;

    .navbar-brand {
      margin: 0 auto;
      text-align: center;
      color: #fff !important;
    }

    .navbar-nav {
      background: #111;
      position: absolute;
      right: 0;
      left: 0;
      padding: 20px 50px;

      .nav-link,
      .nav-link.active {
        color: #fff !important;
        margin-left: 10%;
      }
    }
    .navbar-nav-top {
      margin-top: 0px;
    }

    .navbar-collapse {
      position: absolute;
      left: 0px;
      right: 0px;
      top: 50px;
    }

    .navbar-toggler {
      top: 10px;
      position: absolute;
    }
  }
}

.dropdown-item:hover {
  cursor: pointer;
  color: #6cb2eb !important;
}
.dropdown:hover > .dropdown-menu {
  display: block;
}
</style>