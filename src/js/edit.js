export default () => {
  ACMS.Ready(() => {
    // LiteEditor
    ACMS.Config.LiteEditorConf.btnOptions.push({
      label: '単語区切り',
      tag: 'span',
      className: 'text-word-break',
    },
    {
      label: 'ワンポイント',
      tag: 'span',
      className: 'text-point',
    });
  });
};
