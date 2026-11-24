package duomaravilha.stockflow;

import org.springframework.boot.SpringApplication;

public class TestStockflowApplication {

	public static void main(String[] args) {
		SpringApplication.from(StockflowApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
