/*! videojs-theater - v0.0.0 - 2015-8-7
 * Copyright (c) 2015 Tolga Akyüz
 * Licensed under the MIT license. */
(function(window, vjs) {
  'use strict';

  var defaults = {
    option: true
  };

  /**
   * Initialize the plugin.
   * @param options (optional) {object} configuration for the plugin
   */
  var theater = function (options) {
    var settings = vjs.util.mergeOptions(defaults, options),
        player = this;

    player.theaterModeToggle = new vjs.TheaterModeToggle(player, options);
    return player.controlBar.addChild(player.theaterModeToggle);
  };

  // register the plugin
  vjs.plugin('theater', theater);

  /**
   * Toggle viewsize of the player
   * @param {vjs.Player|Object} player
   * @param {Object=} options
   * @class
   * @extends vjs.Button
   */
  vjs.TheaterModeToggle = vjs.Button.extend({
    /**
     * @constructor
     * @memberof vjs.TheaterModeToggle
     * @instance
     */
    init: function(player, options){
      vjs.Button.call(this, player, options);
    }
  });

  vjs.TheaterModeToggle.prototype.buttonText = 'TheaterMode';

  vjs.TheaterModeToggle.prototype.buildCSSClass = function () {
    return 'vjs-theater-control ' + vjs.Button.prototype.buildCSSClass.call(this);
  };

  vjs.TheaterModeToggle.prototype.onClick = function () {
    var player = this.player()
      , className = this.options().style || 'vjs-theater'

    if (player.isTheaterMode)
      player.removeClass(className);
    else
      player.addClass(className)

    player.isTheaterMode = !player.isTheaterMode;

    if (this.options().onChange && typeof this.options().onChange === 'function')
      this.options().onChange(player.isTheaterMode);
  };
})(window, vjs);
