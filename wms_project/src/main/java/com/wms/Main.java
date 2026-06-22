package com.wms;

import com.wms.dao.OrderItemDAO;
import com.wms.model.OrderItem;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.List;
import java.util.Properties;
import java.util.Scanner;
import java.util.UUID;

public class Main {
    public static void main(String[] args) {
        Properties props = new Properties();
        
        try (var is = Main.class.getClassLoader().getResourceAsStream("db.properties")) {
            if (is == null) {
                System.err.println("Ошибка: Файл db.properties не найден в папке resources!");
                return;
            }
            props.load(is);
            
            Connection conn = DriverManager.getConnection(
                props.getProperty("db.url"), 
                props.getProperty("db.user"), 
                props.getProperty("db.password")
            );

            // Создаем Scanner внутри try-with-resources
            try (Scanner scanner = new Scanner(System.in)) {
                OrderItemDAO dao = new OrderItemDAO(conn);

                while (true) {
                    System.out.println("\n--- WMS Order Items Management ---");
                    System.out.println("1. Посмотреть товары в заказе");
                    System.out.println("2. Добавить товар в заказ");
                    System.out.println("3. Изменить количество");
                    System.out.println("4. Удалить товар из заказа");
                    System.out.println("0. Выход");
                    System.out.print("Выбор: ");

                    int choice = Integer.parseInt(scanner.nextLine());
                    if (choice == 0) break;

                    System.out.print("Введите UUID заказа: ");
                    UUID orderId = UUID.fromString(scanner.nextLine());

                    switch (choice) {
                        case 1:
                            List<OrderItem> items = dao.getOrderDetails(orderId);
                            items.forEach(System.out::println);
                            break;
                        case 2:
                            System.out.print("Введите UUID товара: ");
                            UUID prodId = UUID.fromString(scanner.nextLine());
                            System.out.print("Количество: ");
                            int qty = Integer.parseInt(scanner.nextLine());
                            dao.addProductToOrder(orderId, prodId, qty);
                            System.out.println("Успешно добавлено.");
                            break;
                        case 3:
                            System.out.print("Введите UUID товара: ");
                            UUID pId = UUID.fromString(scanner.nextLine());
                            System.out.print("Новое количество: ");
                            int newQty = Integer.parseInt(scanner.nextLine());
                            dao.updateQuantity(orderId, pId, newQty);
                            System.out.println("Количество обновлено.");
                            break;
                        case 4:
                            System.out.print("Введите UUID товара для удаления: ");
                            UUID delId = UUID.fromString(scanner.nextLine());
                            dao.removeItemFromOrder(orderId, delId);
                            System.out.println("Товар удален из заказа.");
                            break;
                    }
                }
            } // Scanner автоматически закроется здесь
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}