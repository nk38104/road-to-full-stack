
$("[type='button']").click(function() {
    let $this = $(this);

    $this.addClass("pressed");
    setTimeout(function() {
        $this.removeClass("pressed");
    }, 100);
});