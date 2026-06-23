package com.wms;

import com.wms.dao.*;
import com.wms.model.*;
import java.sql.*;
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Properties props = new Properties();
        try (var is = Main.class.getResourceAsStream("/db.properties")) {
            if (is == null) throw new RuntimeException("db.properties not found");
            props.load(is);

            try (Connection conn = DriverManager.getConnection(
                    props.getProperty("db.url"), props.getProperty("db.user"), props.getProperty("db.password"));
                 Scanner scanner = new Scanner(System.in)) {

                WarehouseDAO warehouseDAO = new WarehouseDAO(conn);
                CatalogDAO catalogDAO = new CatalogDAO(conn);
                EmployeeDAO employeeDAO = new EmployeeDAO(conn);
                OrderItemDAO orderItemDAO = new OrderItemDAO(conn);
                OrderDAO orderDAO = new OrderDAO(conn);

                while (true) {
                    System.out.println("\n========== СИСТЕМА УПРАВЛЕНИЯ СКЛАДОМ (WMS) ==========");
                    System.out.println("1. СКЛАДЫ: Просмотр складов и ячеек");
                    System.out.println("2. КАТАЛОГ: Просмотр товаров и категорий");
                    System.out.println("3. ПЕРСОНАЛ: Список сотрудников");
                    System.out.println("4. ЗАКАЗЫ: Управление позициями (Many-to-Many)");
                    System.out.println("0. ВЫХОД");
                    System.out.print("Выберите раздел: ");

                    String rootChoice = scanner.nextLine();
                    if ("0".equals(rootChoice)) break;

                    switch (rootChoice) {
                        case "1":
                            showWarehouseMenu(scanner, warehouseDAO);
                            break;
                        case "2":
                            showCatalogMenu(scanner, catalogDAO);
                            break;
                        case "3":
                            System.out.println("\n--- СОТРУДНИКИ ---");
                            employeeDAO.getAll().forEach(System.out::println);
                            break;
                        case "4":
                            showOrderMenu(scanner, orderItemDAO, orderDAO);
                            break;
                        default:
                            System.out.println("Неверный ввод.");
                    }
                }
            }
        } catch (Exception e) {
    System.err.println("Critical error: " + e.getMessage());
}
    }

    private static void showWarehouseMenu(Scanner sc, WarehouseDAO dao) throws SQLException {
        System.out.println("\n--- СПИСОК СКЛАДОВ ---");
        List<Warehouse> whs = dao.getAll();
        whs.forEach(System.out::println);
        System.out.print("\nВведите ID склада для просмотра ячеек (или Enter для отмены): ");
        String idStr = sc.nextLine();
        if (!idStr.isEmpty()) {
            dao.getBinsByWarehouse(UUID.fromString(idStr)).forEach(System.out::println);
        }
    }

    private static void showCatalogMenu(Scanner sc, CatalogDAO dao) throws SQLException {
        System.out.println("\n--- КАТАЛОГ ---");
        System.out.println("1. Все товары");
        System.out.println("2. Все категории");
        System.out.print("Выбор: ");
        String choice = sc.nextLine();
        if ("1".equals(choice)) dao.getAllProducts().forEach(System.out::println);
        else if ("2".equals(choice)) dao.getAllCategories().forEach(System.out::println);
    }

    private static void showOrderMenu(Scanner sc, OrderItemDAO itemDao, OrderDAO orderDao) throws SQLException {
    boolean exit = false;
    while (!exit) {
        System.out.println("\n--- УПРАВЛЕНИЕ ЗАКАЗАМИ ---");
        System.out.println("1. Список ВСЕХ заказов (узнать ID)");
        System.out.println("2. Посмотреть позиции конкретного заказа");
        System.out.println("3. Добавить товар в заказ");
        System.out.println("0. Назад");
        System.out.print("Выбор: ");
        
        String choice = sc.nextLine();

        if ("0".equals(choice)) {
            exit = true;
        } else if ("1".equals(choice)) {
            System.out.println("\n--- РЕЕСТР ЗАКАЗОВ ---");
            orderDao.getAllOrders().forEach(System.out::println);
        } else if ("2".equals(choice) || "3".equals(choice)) {
            // Запрашиваем ID только если выбраны пункты 2 или 3
            System.out.print("Введите UUID заказа: ");
            String idInput = sc.nextLine();
            
            if (!idInput.isEmpty()) {
                UUID oid = UUID.fromString(idInput);
                if ("2".equals(choice)) {
                    itemDao.getOrderDetails(oid).forEach(System.out::println);
                } else {
                    System.out.print("Введите UUID товара: ");
                    UUID pid = UUID.fromString(sc.nextLine());
                    System.out.print("Количество: ");
                    int q = Integer.parseInt(sc.nextLine());
                    itemDao.addProductToOrder(oid, pid, q);
                    System.out.println("Товар добавлен.");
                }
            }
        }
    }
}
}