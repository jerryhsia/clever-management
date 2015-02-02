'use strict';
var app = {
  name: 'clever-cms',
  title: 'Clever CMS',
  lang: 'zh-CN',//zh-CN or en-US
  api : 'http://backend.clever.ts',
  debug: true,
  alert_time: 5000,
  default_module_id: 1,
  default_role_id: 1,
  field: {
    input: [
      'input',
      'textarea',
      'radio',
      'checkbox',
      'select',
      'multiple_select',
      'date',
      'file',
      'multiple_file',
      'editor'
    ],
    relation_type: [
      'has_one', 'has_many'
    ]
  },
  pagination: {
    maxSize: 7,
    perPage: 15,
    currentPage: 1,
    selectNums: [
      '5',
      '10',
      '15',
      '20',
      '30',
      '40',
      '50'
    ]
  },
  editor: {
    height: '150',
    menus: [
      ['bold', 'italic', 'underline', 'strikethrough'],
      ['fontsize'],
      ['justifyleft', 'justifycenter', 'justifyright'],
      ['insertunorderedlist', 'insertorderedlist'],
      ['indent', 'outdent'],
      ['removeformat', 'createlink', 'insertimage']
    ]
  }
};
