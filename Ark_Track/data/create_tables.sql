
CREATE TABLE stock (
    id SERIAL PRIMARY KEY,
    symbol TEXT NOT NULL,
    name TEXT NOT NULL,
    exchange TEXT NOT NULL,
    is_etf BOOLEAN NOT NULL
);

Create Table etf_holding (
    etf_id INTEGER NOT NULL,
    holding_id INTEGER NOT NULL,
    dt DATE NOT NULL,
    shares NUMERIC, 
    weight NUMERIC,
    PRIMARY KEY (etf_id,holding_id,dt),
    CONSTRAINT fk_etf FOREIGN KEY (etf_id) REFERENCES stock(id),
    CONSTRAINT fk_holding FOREIGN KEY (holding_id) REFERENCES stock(id)
);

Create Table stock_price (
    stock_id INTEGER NOT NULL,
    dt TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    open NUMERIC NOT NULL,
    high NUMERIC NOT NULL,
    low NUMERIC NOT NULL,
    close NUMERIC NOT NULL,
    volume NUMERIC NOT NULL,
    PRIMARY KEY (stock_id,dt),
    CONSTRAINT fk_stock FOREIGN KEY (stock_id) REFERENCES stock(id) 
);

CREATE INDEX ON stock_price (stock_id, dt DESC);


SELECT create_hypertable ('stock_price', 'dt');

Commands
--docker exec -it timescaledb bash
insert into stock (symbol, name, exchange, is_etf) calues ('APPL', 'Nasdaq', false);
docker exec -it timescaledb bash
docker ps
docker image
psql -U postgres
\d
\l
\c etfdb; - to access databases use (\c)

sp_rename [ @objname = ] 'exchange' , [ @newname = ] 'symbol'   
    [ , [ @objtype = ] 'Column' ];

    UPDATE stock SET is_etf = TRUE
Where symbol IN ('ARKF', 'ARKQ','PRNT', 'IZRL', 'ARKK', 'ARKW', 'ARKF');