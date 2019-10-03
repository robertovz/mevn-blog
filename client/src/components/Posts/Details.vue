<template>
  <div>
    <Navbar />
    <Hero />
    <div class="breadcrumb">
      <div class="breadcrumbs">
        <div class="container">
          <div class="row mx-auto">
            <div class="col-10 mx-auto">
              <div class="d-flex">
                <li>
                  <router-link to="/" class="black">Home</router-link>
                </li>
                <li class="ml-3">
                  <router-link to="/posts" class="black">Posts</router-link>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container py-5">
      <div class="row">
        <div class="col-12">
          <div class="card posts-wrapper">
            <div class="row">
              <div class="col-10 mx-auto py-5">
                <div class="mb-2">
                  <div class="row">
                    <div class="col-lg-1 col-md-2">
                      <img
                        src="../../assets/img/profile/profile.png"
                        class="card-img-top my-2"
                        alt="User picture"
                        style="max-width: 100px;"
                      />
                    </div>
                    <div class="col-lg-11 col-md-10">
                      <span>{{ post.name}} {{ post.last_name}}</span>
                      <span class="ml-3 text-muted">{{ post.created }}</span>
                      <span
                        class="float-right"
                        v-if="post.user_id == form.user_id  || type == 'admin'"
                      >
                        <button class="btn btn-outline" @click="editModal(post)">
                          <i class="fas fa-edit blue"></i>
                        </button>
                        <button class="btn btn-outline" @click="deletePost(post.id)">
                          <i class="fas fa-trash red"></i>
                        </button>
                      </span>
                      <h5 class="text-uppercase mt-2">{{ post.title }}</h5>
                      <div class="py-2">{{ post.short_description }}</div>
                      <div v-html="post.description"></div>
                      <div class="card-text">
                        <span class="post-item" @click="setRating()">
                          <i class="far fa-heart"></i> Likes(0)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-10 mx-auto pt-4 pb-5">
                <div class="mb-3">Comments ({{ comments.length }})</div>
                <div
                  class="text-muted font-weight-bold"
                  v-if="comments.length == 0"
                >No comments yet.</div>
                <div v-for="comment in comments" :key="comment.id" v-else>
                  <div class="mb-3">
                    <div class="row">
                      <div class="col-lg-1 col-md-2">
                        <img
                          src="../../assets/img/profile/profile.png"
                          class="card-img-top my-2"
                          alt="User picture"
                          style="max-width: 100px;"
                        />
                      </div>
                      <div class="col-lg-11 col-md-10">
                        <span
                          class="font-weight-bold"
                        >{{ comment.first_name}} {{ comment.last_name }}</span>
                        <span class="ml-2 text-muted">{{ comment.created }}</span>
                        <div>{{ comment.comment }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-10 mx-auto py-4">
                <form @submit.prevent="setComment(post.id)">
                  <textarea
                    name
                    id
                    class="form-control d-block"
                    style="height: 100px"
                    placeholder="Write a comment"
                    maxlength="550"
                    v-model="form.comment"
                  ></textarea>
                  <button type="submit" class="btn btn-primary my-3">Publish</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />

    <div
      class="modal fade addNew"
      id="addNew"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addNewLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header modal-wrapper-title">
            <div class="modal-title" id="addNewLabel">Update Post Info</div>
            <button type="button" class="close" data-dimiss="modal" aria-label="Close">
              <span class="white">&times;</span>
            </button>
          </div>
          <form @submit.prevent="updatePost()">
            <div class="modal-body">
              <div class="form-group">
                <input
                  v-model="form.title"
                  type="text"
                  class="form-control"
                  name="title"
                  placeholder="Enter Title"
                  :class="{ 'is-invalid': form.errors.has('title') }"
                />
                <has-error :form="form" field="title"></has-error>
              </div>
              <div class="form-group">
                <input
                  v-model="form.short_description"
                  type="text"
                  class="form-control"
                  name="short_description"
                  placeholder="Enter short_description"
                  :class="{ 'is-invalid': form.errors.has('short_description') }"
                />
                <has-error :form="form" field="type"></has-error>
              </div>
              <div class="form-group">
                <vue-editor
                  v-model="form.description"
                  placeholder="Enter Description"
                  :class="{ 'is-invalid': form.errors.has('description') }"
                />
                <has-error :form="form" field="description"></has-error>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn bcustom-primary bred" data-dimiss="modal">Close</button>
              <button type="submit" class="btn bcustom-primary bblue">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from "jwt-decode";
import axios from "axios";

export default {
  props: ["p_post"],
  data() {
    return {
      post: {},
      user: localStorage.usertoken,
      user_id: "",
      comments: {},
      type: "",
      form: new Form({
        user_id: "",
        name: "",
        last_name: "",
        id: "",
        title: "",
        short_description: "",
        description: "",
        post_id: "",
        first_name: "",
        total_comments: 0,
        total_ratings: 0,
        comment: ""
      })
    };
  },

  methods: {
    loadPost() {
      this.post = this.$route.params.p_post;
      this.form.post_id = this.post.id;
    },

    editModal(post) {
      this.form.reset();
      $("#addNew").modal("show");
      this.form.fill(post);
    },

    updatePost(e) {
      this.form.put("api/posts/" + this.form.id).then(() => {
        $("#addNew").modal("hide");
        swal.fire("Updated!", "Information has been updated", "success");
        Fire.$emit("AfterCreate");
      });
    },

    deletePost(id) {
      swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: "true",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            this.form
              .delete("api/posts/" + id)
              .then(() => {
                swal.fire("Deleted!", "Your file has been deleted.", "success");
                Fire.$emit("AfterCreate");
              })
              .catch(() => {
                swal.fire("Failed!", "There was something wrong.", "warning");
              });
          }
        });
    },

    setRating() {
      (this.form.title = this.post.title),
        (this.form.total_ratings = this.post.total_ratings + 1);
      this.form.total_comments = this.post.total_comments + 1;
      this.form.id = this.post.id;
      this.form.put("api/posts/" + this.form.id);
    },

    loadComments() {
      axios
        .get("/userscomment/" + this.post.id)
        .then(({ data }) => (this.comments = data));
    },

    setComment(id) {
      this.form
        .post("/userscomment/")
        .then(() => {
          Fire.$emit("AfterCreate");
          this.form.comment = "";
        })
        .catch(err => {
          swal.fire("Failed", "Try again.", "error");
        });
    }
  },

  created() {
    this.loadPost();
    this.loadComments();
    Fire.$on("AfterCreate", () => {
      this.loadPost();
      this.loadComments();
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