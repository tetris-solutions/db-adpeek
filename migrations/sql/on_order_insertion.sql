create trigger on_order_insertion
    before insert
    on "order"
    for each row
    execute procedure check_order_overlapping();