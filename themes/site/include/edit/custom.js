ACMS.Ready(function() {
  // 下記クラス名を変更するときは、/src/scss/global/_acms-common.scss も変更すること
  ACMS.Config.blockEditorConfig.editorProps.editorProps.attributes.class = 'entry-style';

  // Custom Field LiteEditor
  ACMS.Config.LiteEditorFieldConf.btnOptions = [
    {
      label: '<span class="lite-editor-font-link">' + ACMS.i18n('lite_editor.link') + '</span>',
      tag: 'a',
      className: '',
      sampleText: ACMS.i18n('lite_editor.link_sample_txt'),
    },
  ];
});
