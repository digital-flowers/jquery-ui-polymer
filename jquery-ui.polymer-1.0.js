var widget_uuid = 0, widget_slice = Array.prototype.slice;
$.Widget.prototype._createWidget = function (options, element) {

    element = $(element || this.defaultElement || this)[ 0 ];
    this.element = $(element);
    this.uuid = widget_uuid++;
    this.eventNamespace = "." + this.widgetName + this.uuid;

    this.bindings = $();
    this.hoverable = $();
    this.focusable = $();

    if (element !== this) {
        $.data(element, this.widgetFullName, this);
        this._on(true, this.element, {
            remove: function (event) {
                if (event.target === element) {
                    this.destroy();
                }
            }
        });
        // get element owner shadow root and set as document
        var $shadow = $(element).getOwnerShadowRoot();
        if ($shadow.length > 0) {
            this.document = $(window.document);
        } else {
            this.document = $(element.style ?
                    // element within the document
                    element.ownerDocument :
                    // element is window or document
                    element.document || element);
        }
        this.window = $(this.document[0].defaultView || this.document[0].parentWindow);
    }

    this.options = $.widget.extend({},
            this.options,
            this._getCreateOptions(),
            options);

    this._create();
    this._trigger("create", null, this._getCreateEventData());
    this._init();
};
