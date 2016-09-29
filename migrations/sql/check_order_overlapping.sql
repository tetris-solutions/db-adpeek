create or replace function check_order_overlapping()
    returns trigger as
$$
begin
    if exists (
        SELECT "order"."id"
        FROM "order"
        WHERE
            "order"."folder" = NEW.folder
            AND NEW.id != "order"."id"
            AND NEW."start" <= "order"."end"
            AND NEW."end" >= "order"."start"
    ) then
        raise 'You can not have orders with overlapping periods in the same folder';
        return null;
    end if;
    return new;
end
$$ language plpgsql;