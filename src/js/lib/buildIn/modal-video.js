import ModalVideo from 'modal-video';
import 'modal-video/css/modal-video.min.css';

export default (context, options = {}) => {
  const defaultOptions = {
    channel: 'youtube',
    youtube: {
      autoplay: 1,
      cc_load_policy: 1,
      color: null,
      controls: 1,
      disablekb: 0,
      enablejsapi: 0,
      end: null,
      fs: 1,
      h1: null,
      iv_load_policy: 1,
      loop: 0,
      modestbranding: null,
      origin: null,
      playsinline: null,
      rel: 0,
      showinfo: 1,
      start: 0,
      wmode: 'transparent',
      theme: 'dark',
    },
    ratio: '16:9',
    vimeo: {
      api: false,
      autopause: true,
      autoplay: true,
      byline: true,
      callback: null,
      color: null,
      height: null,
      loop: false,
      maxheight: null,
      maxwidth: null,
      player_id: null,
      portrait: true,
      title: true,
      width: null,
      xhtml: false,
    },
    allowFullScreen: true,
    animationSpeed: 300,
    classNames: {
      modalVideo: 'modal-video',
      modalVideoClose: 'modal-video-close',
      modalVideoBody: 'modal-video-body',
      modalVideoInner: 'modal-video-inner',
      modalVideoIframeWrap: 'modal-video-movie-wrap',
      modalVideoCloseBtn: 'modal-video-close-btn',
    },
    aria: {
      openMessage: 'ビデオを再生します',
      dismissBtnMessage: 'ビデオを閉じます',
    },
  };

  new ModalVideo(context, Object.assign(defaultOptions, options)); // eslint-disable-line no-new
};
