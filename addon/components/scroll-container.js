import Ember from 'ember';
import StyleBindingsMixin from 'ember-table/mixins/style-bindings';
import ScrollHandlerMixin from 'ember-table/mixins/scroll-handler';

export default Ember.Component.extend(
StyleBindingsMixin, ScrollHandlerMixin, {

  classNames: ['ember-table-scroll-container'],
  styleBindings: ['left', 'width', 'height'],
  scrollElementSelector: '.antiscroll-inner',

  scrollContainerWidth: null,
  fixedColumnsWidth: null,

  width: Ember.computed.alias('scrollContainerWidth'),
  // 10 is the height of the horizontal scrollbar
  height: 10,
  left: Ember.computed.alias('fixedColumnsWidth'),
  scrollLeft: null,

  // HACK: onScrollLeftDidChange will not fire unless scrollLeft has been get
  // at least once. Therefore, we want to call onScrollLeftDidChange in
  // didInsertElement
  didInsertElement: function() {
    this._super();
    this.onScrollLeftDidChange();
  },

  // `event` here is a jQuery event
  onScroll: function(event) {
    this.sendAction('scrollLeftDidChange', event.target.scrollLeft);
    event.preventDefault();
  },

  onScrollLeftDidChange: Ember.observer('scrollLeft', 'scrollElementSelector', function() {
    var selector = this.get('scrollElementSelector');
    this.$(selector).scrollLeft(this.get('scrollLeft'));
  })
});