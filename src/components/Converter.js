import React, { useState, useEffect } from "react";
import {
  Container,
  FormControl,
  InputGroup,
  Dropdown,
  DropdownButton,
  Row,
  Col,
} from "react-bootstrap";
import { useExchangeRatesapi, useBinanceApi } from "./ExchangeApi";

const Converter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("BTCUSDT");
  const [result, setResult] = useState("");

  const fromCurrencies = useExchangeRatesapi();
  const toCurrencies = useBinanceApi();

  const convertHandler = () => {
    const from = fromCurrencies.filter(
      ({ symbol }) => symbol === fromCurrency
    )[0];
    const to = toCurrencies.filter(({ symbol }) => symbol === toCurrency)[0];
    const result = amount / from.price / to.price;
    return setResult(result.toFixed(6));
  };

  useEffect(() => {
    if (fromCurrencies.length > 0 && toCurrencies.length > 0) {
      convertHandler();
    }
  });

  return (
    <Container>
      <Row style={{ padding: "3%" }}>
        <Col>
          <InputGroup className="mb-3" size="lg">
            <FormControl
              type="number"
              required="required"
              value={amount}
              onChange={(event) => {
                setAmount(event.target.value);
                convertHandler();
              }}
            />
            <DropdownButton
              as={InputGroup.Append}
              variant="outline-secondary"
              title={fromCurrency}
              id="from"
              onSelect={(event) => {
                setFromCurrency(event);
                convertHandler();
              }}
            >
              {fromCurrencies.map(({ symbol }) => (
                <Dropdown.Item key={symbol} eventKey={symbol}>
                  {symbol}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </InputGroup>
        </Col>
        <Col>
          <InputGroup className="mb-3" size="lg">
            <FormControl type="text" value={result} />
            <DropdownButton
              as={InputGroup.Append}
              variant="outline-secondary"
              title={toCurrency}
              id="to"
              onSelect={(event) => {
                setToCurrency(event);
                convertHandler();
              }}
            >
              {toCurrencies.map(({ symbol }) => (
                <Dropdown.Item key={symbol} eventKey={symbol}>
                  {symbol}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};
export default Converter;
