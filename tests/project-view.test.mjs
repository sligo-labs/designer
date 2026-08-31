import test from 'node:test';
import assert from 'node:assert/strict';

import { projectChatTabRef, sameDesignProject } from '../project-view.ts';

const projectSnapshot = `- generic
  - link "Back to projects" [ref=e2]
  - tablist "Project view"
    - tab "chat-glyph" [ref=e6]
    - tab "files-glyph" [selected, ref=e7]
    - tab "preview-glyph" [ref=e8]
  - button "Share" [ref=e4]`;

test('projectChatTabRef returns the first tab scoped to Project view', () => {
  assert.equal(projectChatTabRef(projectSnapshot), 'e6');
});

test('projectChatTabRef ignores unrelated tabs before Project view', () => {
  assert.equal(
    projectChatTabRef(`- tablist "Browser tabs"\n  - tab "Other" [ref=e1]\n${projectSnapshot}`),
    'e6',
  );
});

test('projectChatTabRef returns null when the project tablist is absent or empty', () => {
  assert.equal(projectChatTabRef('- generic\n  - textbox "Prompt" [ref=e1]'), null);
  assert.equal(projectChatTabRef('- tablist "Project view"\n  - button "Share" [ref=e2]'), null);
});

test('sameDesignProject requires the activated tab to be the intended project', () => {
  const expected = 'https://claude.ai/design/p/AAA-BBB?file=one.html';
  assert.equal(sameDesignProject(expected, 'https://claude.ai/design/p/aaa-bbb?file=two.html'), true);
  assert.equal(sameDesignProject(expected, 'https://claude.ai/design/p/other'), false);
  assert.equal(sameDesignProject(expected, ''), false);
});
