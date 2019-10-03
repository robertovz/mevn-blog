<template>
  <div>
    <footer id="footer" class="footer-1">
      <div class="main-footer widgets-dark typo-light">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-6 col-lg-3">
              <div class="widget subscribe no-box">
                <h5 class="widget-title">
                  LUXURY RESORTS
                  <span></span>
                </h5>
                <p
                  class="widget-text"
                >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem est eligendi vero, hic facere impedit.</p>
              </div>
            </div>

            <div class="col-xs-12 col-md-6 col-lg-3">
              <div class="widget no-box">
                <h5 class="widget-title">
                  Quick Links
                  <span></span>
                </h5>
                <ul class="thumbnail-widget">
                  <li>
                    <a href="#" class="thumb-content">Get Started</a>
                  </li>
                  <li>
                    <a href="#" class="thumb-content">Top Leaders</a>
                  </li>
                  <li>
                    <a href="#" class="thumb-content">Success Stories</a>
                  </li>
                  <li>
                    <a href="#" class="thumb-content">Event/Tickets</a>
                  </li>
                  <li>
                    <a href="#" class="thumb-content">News</a>
                  </li>
                  <li>
                    <a href="#" class="thumb-content">Lifestyle</a>
                  </li>
                  <li>
                    <a href="#" class="thumb-content">About</a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-xs-12 col-md-6 col-lg-3">
              <div class="widget no-box">
                <h5 class="widget-title">
                  Get Started
                  <span></span>
                </h5>
                <p
                  class="widget-text"
                >Accusamus veritatis culpa fugit nostrum quis eveniet tempore eaque similique beatae ratione.</p>
              </div>
            </div>

            <div class="col-xs-12 col-md-6 col-lg-3">
              <div class="widget no-box">
                <h5 class="widget-title">Newsletter</h5>
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Your Email Address" />
                  <button class="btn btn-primary" style="border-radius: 0">
                    <i class="fas fa-check"></i>
                  </button>
                </div>
                <ul class="social-pet mt-4">
                  <li>
                    <a href="#" title="facebook">
                      <i class="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" title="twitter">
                      <i class="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" title="google-plus">
                      <i class="fab fa-google-plus-g"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" title="instagram">
                      <i class="fab fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-copyright">
          <div class="container">
            <div class="row">
              <div class="col-md-12 text-center">
                <p>Copyright LuxuryResorts © 2019. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
footer .main-footer {
  padding: 20px 0;
  background: #252525;
}
footer ul {
  padding-left: 0;
  list-style: none;
}

.footer-copyright {
  background: #222;
  padding: 5px 0;
  right: 0;
  left: 0;
  position: absolute;
}
.footer-copyright .logo {
  display: inherit;
}
.footer-copyright nav {
  float: right;
  margin-top: 5px;
}
.footer-copyright nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.footer-copyright nav ul li {
  border-left: 1px solid #505050;
  display: inline-block;
  line-height: 12px;
  margin: 0;
  padding: 0 8px;
}
.footer-copyright nav ul li a {
  color: #969696;
}
.footer-copyright nav ul li:first-child {
  border: medium none;
  padding-left: 0;
}
.footer-copyright p {
  color: #969696;
  margin: 2px 0 0;
}

.footer-top {
  background: #252525;
  padding-bottom: 30px;
  margin-bottom: 30px;
  border-bottom: 3px solid #222;
}

footer.transparent .footer-top,
footer.transparent .main-footer {
  background: transparent;
}
footer.transparent .footer-copyright {
  background: none repeat scroll 0 0 rgba(0, 0, 0, 0.3);
}

footer.light .footer-top {
  background: #f9f9f9;
}
footer.light .main-footer {
  background: #f9f9f9;
}
footer.light .footer-copyright {
  background: none repeat scroll 0 0 rgba(255, 255, 255, 0.3);
}

.footer- .logo {
  display: inline-block;
}

.widget {
  padding: 20px;
  margin-bottom: 40px;
}
.widget.widget-last {
  margin-bottom: 0px;
}
.widget.no-box {
  padding: 0;
  background-color: transparent;
  margin-bottom: 40px;
  box-shadow: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  -ms-box-shadow: none;
  -o-box-shadow: none;
}
.widget.subscribe p {
  margin-bottom: 18px;
}
.widget li a {
  color: #ff8d1e;
}
.widget li a:hover {
  color: #4b92dc;
}
.widget-title {
  margin-bottom: 20px;
}
.widget-title span {
  background: #839fad none repeat scroll 0 0;
  display: block;
  height: 1px;
  text-align: left;
  margin: 0 auto;
  margin-top: 25px;
  position: relative;
  width: 20%;
}
.widget-title span::after {
  background: inherit;
  content: "";
  height: inherit;
  position: absolute;
  top: -4px;
  width: 50%;
}
.widget-title.text-center span,
.widget-title.text-center span::after {
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
}
.widget .badge {
  float: right;
  background: #7f7f7f;
}

.widget-title,
.widget-text {
  color: #fff;
}

ul.social-footer2 {
  margin: 0;
  padding: 0;
  width: auto;
}
ul.social-footer2 li {
  display: inline-block;
  padding: 0;
}
ul.social-footer2 li a {
  display: block;
  height: 30px;
  width: 30px;
  text-align: center;
}
.social-pet li {
  display: inline-block;
  margin-right: 10px;
}
.social-pet li a {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  text-align: center;
  display: block;
  line-height: 35px;
  background-color: #3a5a95;
  color: #fff;
}
.social-pet li:nth-child(2) a {
  background-color: #57aced;
}
.social-pet li:nth-child(3) a {
  background-color: #dd4f43;
}
.social-pet li:nth-child(4) a {
  background-color: #6b27b2;
}
.social-pet li a:hover {
  background-color: #0141a2;
}
.social-pet li a:hover i {
  transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
}
</style>