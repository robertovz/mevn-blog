<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="row mt-4">
        <div class="col-md-10 mx-auto">
          <div class="col-12">
            <div class="card p-4" v-if="user !== undefined && user !== null && user !== ''">
              <div class="card-body">
                  <form @submit.prevent="createPost()">
                    <div class="form-group">
                      <vue-editor
                        v-model="form.description"
                        placeholder="Enter Description"
                        :class="{ 'is-invalid': form.errors.has('description') }"
                      />
                      <has-error :form="form" field="description"></has-error>
                    </div>
                    <button type="submit" class="btn bcustom-primary bblue">Publish</button>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-10 mx-auto">
          <posts-component :posts.sync="posts" @changed="changedUser"></posts-component>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>


<script>
import jwtDecode from "jwt-decode";
import axios from "axios";

export default {
  data() {
    return {
      posts: {},
      user: localStorage.usertoken,
      form: new Form({
        user_id: "",
        name: "",
        last_name: "",
        id: "",
        title: "",
        short_description: "",
        description: ""
      })
    };
  },
  methods: {
    createPost() {
      this.form
        .post("api/posts")
        .then(() => {
          Fire.$emit("AfterCreate");

          toast.fire({
            type: "success",
            title: "Post Created in successfully"
          });
          (this.form.title = ""),
            (this.form.short_description = ""),
            (this.form.description = "");
        })
        .catch(err => {
          console.log(err);
          swal.fire("Failed!", "There was something wrong.", "warning");
        });
    },

    loadPosts() {
      axios.get("api/posts").then(({ data }) => (this.posts = data));
    },

    changedUser(id) {
      axios.get("api/posts/" + id).then(({ data }) => (this.posts = data));
    }
  },
  created() {
    this.loadPosts();
    Fire.$on("AfterCreate", () => {
      this.loadPosts();
    });
    if (this.user !== undefined && this.user !== null && this.user !== "") {
      const decoded = jwtDecode(this.user);
      this.form.user_id = decoded.id;
      this.form.name = decoded.first_name;
      this.form.first_name = decoded.first_name;
      this.form.last_name = decoded.last_name;
      this.type = decoded.type;
    }
  }
};
</script>