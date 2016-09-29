create trigger on_order_update
    before update
    on "order"
    for each row
    execute procedure check_order_overlapping();