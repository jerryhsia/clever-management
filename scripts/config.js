'use strict';
var app = {
  name: 'clever-cms',
  api : 'http://backend.clever.ts',
  debug: true,
  alert_time: 5000,
  default_module_id: 1,
  field_inputs: [
    'input',
    'textarea',
    'select',
    'multiple_select',
    'date',
    'files'
  ],
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
  }
};
