import test from 'node:test';
import assert from 'node:assert/strict';

import { tabHandle } from '../browser.ts';

test('tabHandle prefers the stable agent-browser tabId', () => {
  assert.equal(tabHandle({ tabId: 't2', index: 1, active: true, title: '', type: 'page', url: '' }), 't2');
});

test('tabHandle supports older agent-browser numeric indexes', () => {
  assert.equal(tabHandle({ index: 1, active: false, title: '', type: 'page', url: '' }), 1);
});

test('tabHandle fails closed when neither handle exists', () => {
  assert.equal(tabHandle({ active: false, title: '', type: 'page', url: '' }), null);
});
