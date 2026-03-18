# Database Export Instructions

This guide explains how to export the Railway database to CSV files.

## Prerequisites

Make sure PostgreSQL client tools are installed:

```bash
brew install postgresql@17
```

## Export Commands

Export both the `mailing_list` and `tryout_registrations` tables using these commands:

### Export Mailing List

```bash
/opt/homebrew/opt/postgresql@17/bin/psql "$(railway run bash -c 'echo $DATABASE_URL')" -c "COPY mailing_list TO STDOUT WITH CSV HEADER" > database-exports/mailing_list_$(date +%Y%m%d_%H%M%S).csv
```

### Export Tryout Registrations

```bash
/opt/homebrew/opt/postgresql@17/bin/psql "$(railway run bash -c 'echo $DATABASE_URL')" -c "COPY tryout_registrations TO STDOUT WITH CSV HEADER" > database-exports/tryout_registrations_$(date +%Y%m%d_%H%M%S).csv
```

## Quick Export (Both Tables)

Run both exports at once:

```bash
DB_URL=$(railway run bash -c 'echo $DATABASE_URL')
/opt/homebrew/opt/postgresql@17/bin/psql "$DB_URL" -c "COPY mailing_list TO STDOUT WITH CSV HEADER" > database-exports/mailing_list_$(date +%Y%m%d_%H%M%S).csv
/opt/homebrew/opt/postgresql@17/bin/psql "$DB_URL" -c "COPY tryout_registrations TO STDOUT WITH CSV HEADER" > database-exports/tryout_registrations_$(date +%Y%m%d_%H%M%S).csv
```

## Verify Exports

Check that the files were created:

```bash
ls -lht database-exports/ | head -5
```

## File Naming Convention

Files are automatically named with timestamps:
- `mailing_list_YYYYMMDD_HHMMSS.csv`
- `tryout_registrations_YYYYMMDD_HHMMSS.csv`

This ensures each export is preserved and sortable by date.

## Notes

- Make sure you're linked to the Railway project: `railway status`
- The export includes all columns with CSV headers
- Files are saved in the `database-exports/` directory
- Previous exports are preserved (not overwritten)
