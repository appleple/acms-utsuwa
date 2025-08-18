ACMS.Ready(function() {
  // 下記クラス名を変更するときは、/src/scss/global/_acms-common.scss も変更すること
  ACMS.Config.blockEditorConfig.editorProps.editorProps.attributes.class = 'entry-style';

  // Custom Field LiteEditor
  ACMS.Config.LiteEditorFieldConf.nl2br = false;
  ACMS.Config.LiteEditorFieldConf.btnPosition = 'bottom';
  ACMS.Config.LiteEditorFieldConf.classNames = {
    LiteEditor: 'entryFormLiteEditor',
    LiteEditorBtnGroup: 'acms-admin-btn-group acms-admin-btn-group-inline',
    LiteEditorBtn: 'acms-admin-btn',
    LiteEditorBtnActive: 'acms-admin-btn acms-admin-btn-active',
    LiteEditorBtnClose: '',
    LiteEditorTooltipInput: 'acms-admin-form-width-full',
  };
  ACMS.Config.LiteEditorFieldConf.message = {
    addLinkTitle: ACMS.i18n('lite_editor.add_link_title'),
    updateLinkTitle: ACMS.i18n('lite_editor.update_link_title'),
    addLink: ACMS.i18n('lite_editor.add_link'),
    updateLink: ACMS.i18n('lite_editor.update_link'),
    removeLink: ACMS.i18n('lite_editor.remove_link'),
    linkUrl: ACMS.i18n('lite_editor.link_url'),
    linkLabel: ACMS.i18n('lite_editor.link_label'),
    targetBlank: ACMS.i18n('lite_editor.target'),
    targetBlankLabel: ACMS.i18n('lite_editor.target_label'),
  };
  ACMS.Config.LiteEditorFieldConf.btnOptions = [
    {
      label: '<span class="lite-editor-font-link">' + ACMS.i18n('lite_editor.link') + '</span>',
      tag: 'a',
      className: '',
      sampleText: ACMS.i18n('lite_editor.link_sample_txt'),
    },
  ];
});
