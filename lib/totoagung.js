'use babel';

import TotoagungView from './totoagung-view';
import { CompositeDisposable } from 'atom';

export default {

  totoagungView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.totoagungView = new TotoagungView(state.totoagungViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.totoagungView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'totoagung:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.totoagungView.destroy();
  },

  serialize() {
    return {
      totoagungViewState: this.totoagungView.serialize()
    };
  },

  toggle() {
    console.log('Totoagung was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
