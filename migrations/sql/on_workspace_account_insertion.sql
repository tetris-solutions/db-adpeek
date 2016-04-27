create trigger on_workspace_account_insertion
    before insert
    on workspace_account
    for each row
    execute procedure check_workspace_account_duplication();