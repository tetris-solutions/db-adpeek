create or replace function check_workspace_account_duplication()
    returns trigger as
$$
begin

-- delete old account

    delete from workspace_account
    where workspace_account.workspace = NEW.workspace AND workspace_account.platform = NEW.platform;

    return new;
end
$$ language plpgsql;