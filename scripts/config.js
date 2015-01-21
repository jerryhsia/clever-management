'use strict';
var app = {
  name: 'clever-cms',
  api : 'http://backend.clever.ts',
  debug: true,
  alert_time: 5000,
  default_module_id: 1,
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
    height: '150px',
    menu: [
      ['bold', 'italic', 'underline', 'strikethrough'],
      ['font-color', 'hilite-color'],
      /*['font'],*/
      ['font-size'],
      ['remove-format'],
      ['ordered-list', 'unordered-list', /*'outdent', 'indent'*/],
      ['left-justify', 'center-justify', 'right-justify'],
      ['code', 'quote', 'paragragh'],
      ['link', 'image']
    ]
  }
};
