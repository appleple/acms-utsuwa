import $ from 'jquery';
import postIncludeFn from './post-include-fn';

export default (context, config) => {
  $.each(config.postIncludeArray.concat({
    mark: config.postIncludeOnsubmitMark,
    type: 'submit',
    method: config.postIncludeMethod,
    effect: config.postIncludeEffect,
    effectSpeed: config.postIncludeEffectSpeed,
  }, {
    mark: config.postIncludeOnreadyMark,
    type: 'ready',
    method: config.postIncludeMethod,
    effect: config.postIncludeEffect,
    effectSpeed: config.postIncludeEffectSpeed,
    delay: config.postIncludeReadyDelay,
  }, {
    mark: config.postIncludeOnBottomMark,
    type: 'bottom',
    method: config.postIncludeMethod,
    effect: config.postIncludeEffect,
    effectSpeed: config.postIncludeEffectSpeed,
    offset: config.postIncludeOffset,
  }, {
    mark: config.postIncludeOnIntervalMark,
    type: 'interval',
    method: config.postIncludeMethod,
    effect: config.postIncludeEffect,
    effectSpeed: config.postIncludeEffectSpeed,
    interval: config.postIncludeIntervalTime,
  }), function () { // eslint-disable-line func-names
    const setting = this;
    $(this.mark, context).each((i, item) => {
      postIncludeFn[setting.type](item, setting);
    });
  });
};
