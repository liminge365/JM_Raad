<template>
  <div class="privacy">
    <mt-header title="简媒隐私政策" class='privacy-title'>
        <i class='iconfont icon-fanhui' slot="left" @click='cancelbtn'></i>
    </mt-header>
    <div class="privacyBox ">
      <h3 class="privacyTitle">简媒隐私政策</h3>
      <p>「简媒」网（以下简称「简媒」）非常重视对您的个人隐私保护，有时候我们需要某些信息才能为您提供您请求的服务，本隐私声明解释了这些情况下的数据收集和使用情况。本隐私声明适用于「简媒」的所有相关服务，随着「简媒」服务范围的扩大，隐私声明的内容可由「简媒」随时更新，且毋须另行通知。更新后的隐私声明一旦在网页上公布即有效代替原来的隐私声明。</p>
      <p class="privacySmTitle">我们收集哪些信息</p>
      <p>通常，您能在匿名的状态下访问「简媒」并获取信息。当我们需要能识别您的个人信息或者可以与您联系的信息时，我们会征求您的同意。通常，在您注册「简媒」或申请开通新的功能时，我们可能收集这些信息：姓名，Email地址，住址，电话号码和任何账号及密码，并征求您的确认。</p>
      <p class="privacySmTitle">关于您的个人信息</p>
      <p>「简媒」严格保护您个人信息的安全。我们使用各种安全技术和程序来保护您的个人信息不被未经授权的访问、使用或泄漏。</p>
      <p>「简媒」会在法律要求或符合「简媒」的相关服务条款、软件许可使用协议约定的情况下透露您的个人信息，或者有如下充分理由相信必须这样做才能：</p>
      <p style="margin-top: 30px;"><span>•</span>满足法律或行政法规的明文规定，或者符合「简媒」网站适用的法律程序；</p>
      <p><span>•</span>符合「简媒」相关服务条款、软件许可使用协议的约定；</p>
      <p><span>•</span>保护「简媒」的权利或财产；</p>
      <p style="margin-bottom: 30px;"><span>•</span>在紧急情况下保护「简媒」员工、「简媒」产品或服务的用户或大众的个人安全。</p>
      <p>「简媒」不会未经您的允许将这些信息与第三方共享，本声明已经列出的上述情况除外。</p>
      <p class="privacySmTitle">Cookie的使用</p>
      <p>使用 Cookie 能帮助您实现您的联机体验的个性化，您可以接受或拒绝 Cookie ，大多数 Web 浏览器会自动接受 Cookie，但您通常可根据自己的需要来修改浏览器的设置以拒绝 Cookie。「简媒」有时会使用 Cookie
        以便知道哪些网站受欢迎，使您在访问「简媒」时能得到更好的服务。Cookie不会跟踪个人信息。当您注册「简媒」时，「简媒」亦会使用 Cookie。在这种情况下，「简媒」会收集并存储有用信息，当您再次访问「简媒」时，我们可辨认您的身份。来自「简媒」的
        Cookie 只能被「简媒」读取。如果您的浏览器被设置为拒绝 Cookie，您仍然能够访问「简媒」的大多数网页。</p>
      <p class="privacySmTitle">关于免责说明</p>
      <p>就下列相关事宜的发生，「简媒」不承担任何法律责任：</p>
      <p>• 由于您将用户密码告知他人或与他人共享注册帐户，由此导致的任何个人信息的泄漏，或其他非因「简媒」原因导致的个人信息的泄漏；</p>
      <p>•「简媒」根据法律规定或政府相关政策要求提供您的个人信息；</p>
      <p>• 任何第三方根据「简媒」各服务条款及声明中所列明的情况使用您的个人信息，由此所产生的纠纷；</p>
      <p>• 任何由于黑客攻击、电脑病毒侵入或政府管制而造成的暂时性网站关闭；</p>
      <p>• 因不可抗力导致的任何后果；</p>
      <p>•「简媒」在各服务条款及声明中列明的使用方式或免责情形。</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'forgetpwd',
    data() {
      return {}
    },
    methods:{
      cancelbtn(){
          this.$router.go(-1);
          window.sessionStorage.setItem('num',2)
       }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../assets/style/vars.less';
  .privacyBox {
    padding: 50px 20px 10px;
    box-sizing: border-box;
    .privacyTitle {
      font-size: 20px;
      font-weight: 500;
      letter-spacing: 0.3px;
      text-align: center;
      color: #333333;
      margin-bottom: 15px;
      margin-top: 15px;
    }
    p {
      text-align: justify;
      font-size: 14px;
      letter-spacing: 0.2px;
      color: #666;
      margin: 0;
      line-height: 22px;
    }
    .privacySmTitle {
      font-size: 18px;
      color: #333;
      margin: 20px 0;
    }
  }
  .privacy-title {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

</style>
